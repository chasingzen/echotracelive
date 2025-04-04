import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';

export default function EchoTraceHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 font-sans text-gray-100">
      <header className="text-center py-24">
        <motion.h1
          className="text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          EchoTrace
        </motion.h1>
        <motion.p
          className="text-2xl text-gray-400 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Precision AI. Profound Insight. Early Detection of Neurological and Psychological Conditions.
        </motion.p>
        <motion.button
          className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-4 px-10 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Upload Your Audio
        </motion.button>
      </header>

      {/* How it Works Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        <motion.div
          className="grid md:grid-cols-2 gap-14 items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div>
            <h2 className="text-4xl font-bold mb-6">How EchoTrace Works</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              EchoTrace listens deeply. By analyzing voice patterns, pitch, and rhythm with state-of-the-art neural networks, it identifies subtle signs of mental or neurological strain long before visible symptoms arise.
            </p>
          </div>
          <div className="bg-gradient-to-tr from-gray-800 to-gray-700 p-8 rounded-2xl shadow-xl border border-gray-600">
            <ul className="space-y-6 text-left text-lg">
              <li className="flex items-center gap-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full">1</span>
                Record or upload your voice audio.
              </li>
              <li className="flex items-center gap-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full">2</span>
                EchoTrace securely processes the audio with AI.
              </li>
              <li className="flex items-center gap-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full">3</span>
                Receive actionable insights in a secure dashboard.
              </li>
            </ul>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-gray-800 to-gray-700 p-12 rounded-2xl shadow-2xl border border-gray-600"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h3 className="text-3xl font-semibold mb-4">Ready to get started?</h3>
          <p className="text-gray-400 mb-6 text-lg">
            Upload your first voice sample and step into a smarter diagnostic future.
          </p>
          <motion.button
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-full text-lg font-medium shadow-lg transition-transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Now <ArrowRightIcon className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-gray-600 text-sm">
        © 2025 EchoTrace by Jimmy Starling
      </footer>
    </div>
  );
}
