import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { analyzeMood } from '../utils/analyzeMood';

export default function Home() {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [mood, setMood] = useState('');
  const recognitionRef = useRef(null);

  const youtubePlaylists = {
    happy: 'https://www.youtube.com/embed/ZbZSe6N_BXs',
    sad: 'https://www.youtube.com/embed/hLQl3WQQoQ0',
    angry: 'https://www.youtube.com/embed/8SbUC-UaAxE',
    stressed: 'https://www.youtube.com/embed/2OEL4P1Rz04',
    neutral: 'https://www.youtube.com/embed/5qap5aO4i9A'
  };

  useEffect(() => {
    fetchEntries();
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setEntry((prev) => prev + ' ' + speechResult);
      };
    }
  }, []);

  const fetchEntries = async () => {
    const res = await axios.get('http://localhost:5000/api/Journals/');
    setEntries(res.data.reverse());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const moodDetected = analyzeMood(entry);
    setMood(moodDetected);
    const res = await axios.post('http://localhost:5000/api/Journals/', {
      content: entry
    });
    setFeedback(res.data.feedback);
    setEntry('');
    fetchEntries();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/entries/${id}`);
    fetchEntries();
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧠 Mental Health Journal</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          rows={5}
          className="w-full p-2 border rounded mb-2"
          placeholder="How are you feeling today?"
          required
        />
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={startListening}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            🎙️ Speak
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>

      {feedback && (
        <div className="bg-green-100 p-3 rounded mb-4">
          <strong>AI Feedback:</strong> {feedback}
        </div>
      )}

      {mood && youtubePlaylists[mood] && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">🎧 Mood Booster</h3>
          <iframe
            width="100%"
            height="315"
            src={youtubePlaylists[mood]}
            title="YouTube Mood Booster"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Your Entries</h2>
      {entries.map((entry) => (
        <div
          key={entry._id}
          className="border p-3 rounded mb-2 bg-white shadow"
        >
          <p>{entry.content}</p>
          <small className="block text-gray-600 mb-1">
            {new Date(entry.createdAt).toLocaleString()}
          </small>
          <button
            onClick={() => handleDelete(entry._id)}
            className="text-red-500"
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
}
