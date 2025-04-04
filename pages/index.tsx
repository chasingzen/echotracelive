// pages/index.tsx
import Head from 'next/head';
import AudioUploader from '../components/AudioUploader';

export default function Home() {
  return (
    <>
      <Head>
        <title>EchoTrace Audio Analysis</title>
        <meta name="description" content="Upload voice samples for real-time AI-powered stress and emotion detection." />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-10 text-cyan-400 drop-shadow">
            EchoTrace
          </h1>
          <p className="text-center text-lg text-gray-400 mb-12">
            Upload your voice. Let the AI listen. Get real-time insights into stress, emotion, and cognitive strain.
          </p>

          <AudioUploader />
        </div>
      </main>
    </>
  );
}
