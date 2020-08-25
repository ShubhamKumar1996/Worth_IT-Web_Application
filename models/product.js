// Importing Mongoose module
const mongoose = require("mongoose");

const Schema = mongoose.Schema;     // Schema is basically reference to Schema constructor. Helps in creating new Schema.

const productSchema = new Schema({
    title: { type: String, required: true},
    price: { type: Number, required: true},
    description: { type: String, required: true},
    imageUrl: { type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model('Product', productSchema);  // Product name will be used for this schema and also used as table name in Database.