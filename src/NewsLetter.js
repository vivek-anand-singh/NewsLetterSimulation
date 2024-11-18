import React, { useState } from 'react';
import { 
  Mail, 
  Clock, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Activity 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FlowStates = {
  IDLE: 'idle',
  FIRST_REMINDER: 'first_reminder',
  FIRST_WAIT: 'first_wait',
  SECOND_REMINDER: 'second_reminder',
  SECOND_WAIT: 'second_wait',
  COMPLETED: 'completed'
};

const FlowNode = ({ 
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

const NewsletterFlow = () => {
  const [flowState, setFlowState] = useState(FlowStates.IDLE);
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [renewalStatus, setRenewalStatus] = useState(null);
  const [logCounter, setLogCounter] = useState(0);

  const addLog = (message, type = 'info') => {
    const newLogCounter = logCounter + 1;
    setLogCounter(newLogCounter);
    
    const newLog = {
      id: `log-${newLogCounter}`,
      message,
      timestamp: new Date().toLocaleTimeString(),
      type
    };
    
    setLogs(prev => [...prev, newLog]);
  };

  const simulateRenewal = () => {
    return Math.random() > 0.5;
  };

  const resetFlow = () => {
    setFlowState(FlowStates.IDLE);
    setLogs([]);
    setIsRunning(false);
    setRenewalStatus(null);
  };

  const startFlow = async () => {
    setIsRunning(true);
    setFlowState(FlowStates.FIRST_REMINDER);
    addLog('Initiating newsletter renewal flow', 'start');

    // First reminder
    await new Promise(resolve => setTimeout(resolve, 2000));
    addLog('Sending first renewal reminder email', 'info');
    setFlowState(FlowStates.FIRST_WAIT);

    // First wait period
    await new Promise(resolve => setTimeout(resolve, 4000));
    const firstCheck = simulateRenewal();
    
    if (firstCheck) {
      addLog('User renewed after first reminder!', 'success');
      setRenewalStatus('success');
      setFlowState(FlowStates.COMPLETED);
      setIsRunning(false);
      return;
    }

    // Second reminder
    addLog('No renewal after first reminder', 'warning');
    setFlowState(FlowStates.SECOND_REMINDER);
    await new Promise(resolve => setTimeout(resolve, 2000));
    addLog('Sending second renewal reminder email', 'info');
    setFlowState(FlowStates.SECOND_WAIT);

    // Second wait period
    await new Promise(resolve => setTimeout(resolve, 4000));
    const secondCheck = simulateRenewal();

    if (secondCheck) {
      addLog('User renewed after second reminder!', 'success');
      setRenewalStatus('success');
    } else {
      addLog('No renewal after second reminder. Flow ended.', 'error');
      setRenewalStatus('failed');
    }

    setFlowState(FlowStates.COMPLETED);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 
      flex items-center justify-center p-4">
      <motion.div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-blue-600 text-white p-6 flex items-center">
          <Activity className="w-10 h-10 mr-4" />
          <h1 className="text-2xl font-bold">Newsletter Subscription Renewal Flow</h1>
        </div>

        {/* Flow Visualization */}
        <div className="p-8">
          <div className="flex justify-between items-center mb-12">
            <FlowNode 
              title="First Reminder"
              icon={Mail}
              isActive={flowState === FlowStates.FIRST_REMINDER}
              isCompleted={flowState !== FlowStates.IDLE}
              hasLine
              status={flowState > FlowStates.FIRST_REMINDER ? 'success' : null}
            />
            <ArrowRight className="text-gray-300 w-8 h-8" />
            <FlowNode 
              title="First Wait"
              icon={Clock}
              isActive={flowState === FlowStates.FIRST_WAIT}
              isCompleted={flowState !== FlowStates.IDLE && flowState !== FlowStates.FIRST_REMINDER}
              hasLine
              status={flowState > FlowStates.FIRST_WAIT ? 'success' : null}
            />
            <ArrowRight className="text-gray-300 w-8 h-8" />
            <FlowNode 
              title="Second Reminder"
              icon={RefreshCw}
              isActive={flowState === FlowStates.SECOND_REMINDER}
              isCompleted={flowState !== FlowStates.IDLE && 
                          flowState !== FlowStates.FIRST_REMINDER && 
                          flowState !== FlowStates.FIRST_WAIT}
              hasLine
              status={flowState > FlowStates.SECOND_REMINDER ? 'success' : null}
            />
            <ArrowRight className="text-gray-300 w-8 h-8" />
            <FlowNode 
              title="Completion"
              icon={renewalStatus === 'success' ? CheckCircle : XCircle}
              isActive={flowState === FlowStates.COMPLETED}
              isCompleted={flowState === FlowStates.COMPLETED}
              status={renewalStatus}
            />
          </div>

          {/* Controls */}
          <div className="flex justify-center mb-8">
            {!isRunning && flowState === FlowStates.IDLE && (
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
            )}
            {flowState === FlowStates.COMPLETED && (
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
            )}
          </div>

          {/* Logs */}
          <div className="bg-gray-50 rounded-lg p-6 max-h-64 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Flow Logs</h2>
            <AnimatePresence>
              {logs.map((log) => (
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
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsletterFlow;