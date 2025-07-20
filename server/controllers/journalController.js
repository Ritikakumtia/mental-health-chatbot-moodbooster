const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "You are a supportive mental health assistant. Give kind, empathetic feedback based on the user's journal entry.",
    },
    {
      role: "user",
      content: text,
    },
  ],
});

const feedback = response.choices[0].message.content;
