const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const journalRoutes = require("./routes/journalRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb://localhost:27017/mentalhealthdb"; // No .env needed

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/journals", journalRoutes);

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error("❌ MongoDB connection error:", error);
});
