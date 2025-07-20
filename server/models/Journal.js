const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now }  // ✅ ensures auto date
});

module.exports = mongoose.model("Journal", JournalSchema);
