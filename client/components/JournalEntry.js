export default function JournalEntry({ entry, onDelete }) {
  const date = new Date(entry.date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div style={{
      border: "1px solid #ccc", padding: "10px", marginTop: "10px", borderRadius: "5px"
    }}>
      <p><strong>{date}</strong></p>
      <p>{entry.text}</p>
      <button onClick={() => onDelete(entry._id)}>Delete</button>
    </div>
  );
}
