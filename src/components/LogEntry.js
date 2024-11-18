import React from 'react';
import { motion } from 'framer-motion';

export const LogEntry = ({ log }) => {
  return (
    <motion.div 
      key={log.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start space-x-3 mb-2 p-2 rounded-md 
        ${log.type === 'success' ? 'bg-green-50 text-green-800' :
          log.type === 'error' ? 'bg-red-50 text-red-800' :
          log.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
          'bg-blue-50 text-blue-800'}`}
    >
      <span className="text-gray-500 text-sm">{log.timestamp}</span>
      <span className="flex-grow">{log.message}</span>
    </motion.div>
  );
};