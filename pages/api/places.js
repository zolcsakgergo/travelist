import Place from "../../utils/models/Places";
import connectMongo from "../../utils/db/mongodb";

await connectMongo();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const placeId = req.query.id;

    if (!placeId) {
      const places = await Place.find({});
      return res.status(200).json({ places });
    }

    const place = await Place.findById(placeId);
    return res.status(200).json({ place });
  }

  if (req.method === 'POST') {
      const { name, location, description, latitude, longitude, rating } = req.body;
      
      console.log(req.body);
      
    if (!name || !location || !description || !latitude || !longitude || !rating) {
      return res.status(400).json({ message: "Missing fields" });
    }

    try {
      const place = await Place.create({ name, location, description, latitude, longitude, rating });
      console.log('Place created: ', place);
    }catch(err) {
      console.log(err);
      return res.status(400).json({ message: "Error while creating place." });
    }
    return res.status(200).json({});
  }
}
