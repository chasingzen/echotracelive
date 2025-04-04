// components/AudioUploader.tsx
import React, { useState } from 'react';

export default function AudioUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    console.log('Uploading file:', file);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/analyze', {
  method: 'POST',
  body: formData,
});

let result;
try {
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    result = await res.json();
  } else {
    const text = await res.text();
    console.error('Non-JSON response:', text);
    throw new Error('Server returned non-JSON response');
  }

  if (!res.ok) {
    throw new Error(result?.error || 'Unknown error');
  }

  console.log('✅ Upload and AI response:', result);
} catch (err) {
  console.error('🚨 Upload error:', err.message || err);
}


      const data = await response.json();
      console.log('Response from /api/analyze:', data);

      setResult(data);
    } catch (error) {
      console.error('Upload error:', error);
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
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 px-6 py-2 rounded-full hover:bg-blue-600 transition"
        disabled={!file || loading}
      >
        {loading ? 'Analyzing...' : 'Upload & Analyze'}
      </button>

      {result && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">AI Results</h3>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
