import { Schema, model, models } from "mongoose";

const placeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
        unique: false,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
});

const Place = models.Place || model("Place", placeSchema);

export default Place;
