import connectMongo from "../../utils/db/mongodb";
import RequestHelp from "../../utils/models/RequestHelp";
import jwt from "jsonwebtoken";
import User from "../../utils/models/User";

const SOLVED = "solved";

await connectMongo();

const getNewMessage = (previousMessage, newMessage) => {
    console.log("##", previousMessage, newMessage);
    if (previousMessage && newMessage) return newMessage;
    if (newMessage === SOLVED) return "";
    if (!previousMessage) return newMessage;
    if (newMessage === "") return previousMessage;
    return "";
};

export default async function handler(req, res) {
    if (req.method === "GET") {
        const requestHelps = await RequestHelp.find({});
        return res.status(200).json({ requestHelps });
    }
    if (req.method === "POST") {
        const { token, longitude, latitude, message } = req.body;

        if (!token || !longitude || !latitude) {
            return res.status(400).json({ message: "Missing fields" });
        }

        console.log({ token, longitude, latitude, message });
        try {
            const decoded = jwt.verify(
                token,
                process.env.NEXT_PUBLIC_JWT_SECRET,
            );

            const userId = decoded.id;

            const doesUserExist = await User.findById(userId);

            if (!doesUserExist) {
                return res.status(400).json({ message: "User not found" });
            }

            const previousRequestHelp = await RequestHelp.findOne({
                userId,
            });

            if (!previousRequestHelp) {
                await RequestHelp.create({
                    userId,
                    latitude,
                    longitude,
                    message,
                });
                console.log("Help Request created.");
            } else {
                console.log(
                    "pp",
                    getNewMessage(previousRequestHelp.message, message),
                );
                await RequestHelp.findOneAndUpdate(
                    { userId },
                    {
                        latitude,
                        longitude,
                        message: getNewMessage(
                            previousRequestHelp.message,
                            message,
                        ),
                    },
                );
                console.log("Help Request updated.");
            }
        } catch (err) {
            console.log(err);
            return res
                .status(400)
                .json({ message: "Error while creating request." });
        }
        return res.status(200).json({});
    }
}
