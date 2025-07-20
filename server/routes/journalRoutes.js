const express = require("express");
const router = express.Router();
const Journal = require("../models/Journal");

// Dummy AI feedback generator + mood booster logic
function generateFeedback(text) {
  const lower = text.toLowerCase();

  if (lower.includes("happy")) {
    return {
      feedback: "It's wonderful that you're feeling happy! Keep that joy flowing!",
      mood: "happy"
    };
  } else if (lower.includes("sad") || lower.includes("upset")) {
    return {
      feedback: "It’s okay to feel sad sometimes. Be kind to yourself and consider talking to a friend.",
      mood: "sad"
    };
  } else if (lower.includes("tired") || lower.includes("exhausted")) {
    return {
      feedback: "Sounds like you're really drained. Try to get some rest and recharge.",
      mood: "tired"
    };
  } else if (lower.includes("anxious") || lower.includes("worried")) {
    return {
      feedback: "Take a deep breath. You’ve got this. Try some mindfulness exercises.",
      mood: "anxious"
    };
  } else if (lower.includes("angry") || lower.includes("frustrated")) {
    return {
      feedback: "Letting your anger out is healthy. Try journaling or deep breathing to calm down.",
      mood: "angry"
    };
  } else if (lower.includes("lonely")) {
    return {
      feedback: "You’re not alone. Reach out to someone you trust, or try connecting with a community.",
      mood: "lonely"
    };
  }

  return {
    feedback: "Thanks for sharing. Keep writing, it's a great way to understand your emotions.",
    mood: "default"
  };
}

// Mood boosters map
const moodBoosters = {
  happy: {
    type: "playlist",
    label: "Uplifting Vibes 🎶",
    url: "https://www.youtube.com/watch?v=ZbZSe6N_BXs&list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI"
  },
  sad: {
    type: "video",
    label: "Relaxing Piano for Sad Times 🎹",
    url: "https://www.youtube.com/watch?v=4DLO_p3jzLY"
  },
  tired: {
    type: "meditation",
    label: "2-Minute Meditation for Tired Minds 🧘",
    url: "https://www.youtube.com/watch?v=inpok4MKVLM"
  },
  anxious: {
    type: "meditation",
    label: "Anxiety Relief Guided Meditation 🌿",
    url: "https://www.youtube.com/watch?v=MIr3RsUWrdo"
  },
  angry: {
    type: "video",
    label: "Calming Nature Sounds 🌊",
    url: "https://www.youtube.com/watch?v=lE6RYpe9IT0"
  },
  lonely: {
    type: "music",
    label: "Songs that Understand You 🎧",
    url: "https://www.youtube.com/watch?v=ZmDBbnmKpqQ"
  },
  default: {
    type: "music",
    label: "Feel-Good Playlist 🌞",
    url: "https://www.youtube.com/watch?v=Ho32Oh6b4jc"
  }
};

// POST route to create journal entry
// POST route to create journal entry
router.post("/", async (req, res) => {
  const { text } = req.body;

  try {
    const { feedback, mood } = generateFeedback(text);
    const booster = moodBoosters[mood] || moodBoosters.default;

    const newEntry = new Journal({
      text,
      date: new Date() // ✅ Ensure date is saved
    });

    const savedEntry = await newEntry.save();

    // ✅ Return the correct booster as "moodBooster" and include date if needed
    res.status(200).json({
      message: "Saved",
      feedback,
      moodBooster: booster, // ✅ Fix field name so frontend gets it
      date: savedEntry.date // optional: in case frontend wants to display this directly
    });
  } catch (err) {
    console.error("❌ Error in POST /api/journals:", err);
    res.status(500).json({ error: "Failed to save journal entry" });
  }
});


// GET all entries
router.get("/", async (req, res) => {
  try {
    const entries = await Journal.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Error fetching entries" });
  }
});

// DELETE entry by ID
router.delete("/:id", async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete entry" });
  }
});

module.exports = router;
