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
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = new formidable.IncomingForm({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Formidable error:', err);
        return res.status(500).json({ error: 'File parsing error' });
      }

      const file = files.file?.[0];
      if (!file) {
        console.warn('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
      }

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
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Unexpected server error' });
  }
}
