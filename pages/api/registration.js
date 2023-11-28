import User from "../../utils/models/User";
import connectMongo from "../../utils/db/mongodb";
import bcrypt from "bcrypt";
const saltRounds = 10;

await connectMongo();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const parsedBody = req.body;
    const { email, password } = parsedBody;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const user = await User.create({ email, password: hashedPassword });
      console.log('User created: ', user);
    }catch(err) {
      console.log(err);
      return res.status(400).json({ message: "User already exists" });
    }
    return res.status(200).json({});
  }
}
