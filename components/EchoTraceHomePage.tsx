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
    </div>
  );
}
