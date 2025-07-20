const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
