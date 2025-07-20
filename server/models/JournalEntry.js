const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  feedback: String,
});

module.exports = mongoose.model("JournalEntry", journalEntrySchema);
