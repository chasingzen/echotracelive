// pages/api/analyze.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import OpenAI from 'openai';

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'File parsing error' });
    }

    const file = files.file?.[0];
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = file.filepath;

    try {
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: 'whisper-1',
        response_format: 'json',
        temperature: 0.2,
      });

      res.status(200).json({
        transcription,
        analysis: {
          mood: 'Balanced',
          stress: 'Low',
          confidence: 'Moderate',
        },
      });
    } catch (error) {
      console.error('OpenAI error:', error);
      res.status(500).json({ error: 'AI processing failed' });
    }
  });
}
