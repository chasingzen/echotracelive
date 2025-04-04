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

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-900 text-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Upload Audio for Analysis</h2>

      <input
        type="file"
        accept="audio/*"
        className="mb-4 w-full bg-gray-800 text-white"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-all"
      >
        {loading ? 'Analyzing...' : 'Analyze Audio'}
      </button>

      {result && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-green-400 mb-2">Analysis Result</h3>
          <p className="text-sm text-gray-400">Transcript:</p>
          <p className="text-white italic mb-4">{result.transcript}</p>
          <p className="text-sm text-gray-400">AI Insight:</p>
          <p className="text-cyan-300">{result.analysis}</p>
        </div>
      )}
    </div>
  );
}