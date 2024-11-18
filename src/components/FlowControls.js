import React from 'react';
import { motion } from 'framer-motion';
import { Activity, RefreshCw } from 'lucide-react';

export const FlowControls = ({
  isRunning,
  flowState,
  startFlow,
  resetFlow
}) => {
  if (flowState === 'idle') {
    return (
      <motion.button
        onClick={startFlow}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg 
          hover:bg-blue-700 transition-colors duration-300 
          flex items-center space-x-2 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Activity className="w-6 h-6" />
        <span>Start Renewal Flow</span>
      </motion.button>
    );
  }

  if (flowState === 'completed') {
    return (
      <motion.button
        onClick={resetFlow}
        className="bg-gray-500 text-white px-8 py-3 rounded-lg 
          hover:bg-gray-600 transition-colors duration-300 
          flex items-center space-x-2 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RefreshCw className="w-6 h-6" />
        <span>Reset Flow</span>
      </motion.button>
    );
  }

  return null;
};