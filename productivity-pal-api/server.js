// server.js
import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';


const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { model = "gpt-4o-mini", messages } = req.body;
    // v4+ SDK uses chat.completions.create()
    const response = await openai.chat.completions.create({
      model,
      messages
    });
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message });
  }
});

const port = process.env.PORT || 4000;
app.listen(port,'0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
