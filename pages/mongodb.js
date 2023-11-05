
import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect(process.env.MONGODB_DATABASE_URL);

export default connectMongo;
