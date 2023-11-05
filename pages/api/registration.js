import User from "../../utils/models/User";
import connectMongo from "../../utils/db/mongodb";
import bcrypt from "bcrypt";
import { redirect } from 'next/navigation'
const saltRounds = 10;

await connectMongo();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const parsedBody = JSON.parse(req.body)
    const { email, password } = parsedBody;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPassword});
    console.log('User created: ', user);
    redirect('/login');
  }
}
