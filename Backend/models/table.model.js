const mongoose = require("mongoose");
// user Schema
const tableSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    file: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);




//  Model
const Table = mongoose.model("table", tableSchema);

module.exports = Table;
