import User from "../../utils/models/User";
import connectMongo from "../../utils/db/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

await connectMongo();


export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const parsedBody = req.body;
      const { email, password } = parsedBody;


      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret is not defined" });
      }

      const token = jwt.sign({ id: user._id }, process.env.NEXT_PUBLIC_JWT_SECRET, {
        expiresIn: '5d'
      });

      res.setHeader("Set-Cookie", `token=${token}; path=/;`);

      return res.status(200).json({});
    }
  } catch (error) {
    console.error("Login failed", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
