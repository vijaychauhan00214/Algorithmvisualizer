// src/openaiService.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export async function getChatResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching chat response:", error);
    throw error;
  }
}
