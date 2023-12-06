import { Schema, model, models } from 'mongoose';

const requestHelpSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: false,
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    }
});

const RequestHelp = models.RequestHelp || model('RequestHelp', requestHelpSchema);

export default RequestHelp;