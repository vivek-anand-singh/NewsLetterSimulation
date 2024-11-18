import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

export const FlowNode = ({ 
  title, 
  icon: Icon, 
  isActive, 
  isCompleted, 
  hasLine,
  status 
}) => {
  const getStatusColor = () => {
    if (isCompleted) return 'border-green-500 bg-green-50';
    if (isActive) return 'border-blue-500 bg-blue-50';
    return 'border-gray-300 bg-gray-50';
  };

  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`
        relative flex items-center justify-center w-16 h-16 
        rounded-full border-2 transition-all duration-300 
        ${getStatusColor()}
      `}>
        <Icon className={`w-8 h-8 ${
          isCompleted ? 'text-green-500' : 
          isActive ? 'text-blue-500' : 
          'text-gray-400'
        }`} />
        {status && (
          <div className="absolute -bottom-2 -right-2">
            {status === 'success' ? (
              <CheckCircle className="text-green-500 w-5 h-5" />
            ) : (
              <XCircle className="text-red-500 w-5 h-5" />
            )}
          </div>
        )}
      </div>
      <p className="mt-3 text-sm font-medium text-gray-600">{title}</p>
      {hasLine && (
        <motion.div 
          className={`h-0.5 w-24 mt-6 transition-colors duration-300 
            ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
};