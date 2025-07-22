// client/utils/analyzeMood.js
export function analyzeMood(text) {
  const mood = text.toLowerCase();
  if (mood.includes('happy')) return 'happy';
  if (mood.includes('sad') || mood.includes('lonely')) return 'sad';
  if (mood.includes('angry')) return 'angry';
  if (mood.includes('stressed') || mood.includes('tired') || mood.includes('exhausted')) return 'stressed';
  return 'neutral';
}
