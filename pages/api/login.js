import User from "../../utils/models/User";
import connectMongo from "../mongodb";
import bcrypt from "bcrypt";

await connectMongo();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const parsedBody = JSON.parse(req.body);
    const { email, password } = parsedBody;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    return res.status(200).json({});
  }
}
