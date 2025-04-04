// components/AudioUploader.tsx
import React, { useState } from 'react';

export default function AudioUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('audio', file);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-900 text-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Upload Audio for Analysis</h2>
      <input
        type="file"
        accept="audio/*"
        className="mb-4 w-full"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
        disabled={!file || loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Audio'}
      </button>

      {result && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-green-400">Analysis Result</h3>
          <p className="text-sm text-gray-400 mt-2">Transcript:</p>
          <p className="text-white mt-1 mb-3 italic">{result.transcript}</p>
          <p className="text-sm text-gray-400">AI Insight:</p>
          <p className="text-cyan-300 mt-1">{result.analysis}</p>
        </div>
      )}
    </div>
  );
}"

// pages/api/analyze.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readFileAsync(filePath: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm({ uploadDir: '/tmp', keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'File upload error' });

    const file = files.audio as formidable.File;
    const buffer = await readFileAsync(file.filepath);

    // Whisper (speech-to-text)
    const whisperResp = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: (() => {
        const formData = new FormData();
        formData.append('file', new Blob([buffer]), 'audio.wav');
        formData.append('model', 'whisper-1');
        return formData;
      })(),
    });

    const whisperData = await whisperResp.json();
    const transcript = whisperData.text;

    // GPT Insight
    const gptResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in detecting stress and emotional tone in speech transcripts. Provide a professional psychological insight based on the following transcript.',
          },
          {
            role: 'user',
            content: transcript,
          },
        ],
      }),
    });

    const gptData = await gptResp.json();
    const analysis = gptData.choices?.[0]?.message?.content || 'No analysis returned.';

    res.status(200).json({ transcript, analysis });
  });
}
