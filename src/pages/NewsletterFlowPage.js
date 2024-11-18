import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Mail, Clock, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import { FlowNode } from '../components/FlowNode';
import { LogEntry } from '../components/LogEntry';
import { FlowControls } from '../components/FlowControls';
import { useFlowSimulation } from '../hooks/useFlowSimulation';
import { FlowStates } from '../utils/flowStates';

const NewsletterFlowPage = () => {
  const {
    flowState,
    logs,
    isRunning,
    renewalStatus,
    startFlow,
    resetFlow
  } = useFlowSimulation();

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
            <FlowControls
              isRunning={isRunning}
              flowState={flowState}
              startFlow={startFlow}
              resetFlow={resetFlow}
            />
          </div>

          {/* Logs */}
          <div className="bg-gray-50 rounded-lg p-6 max-h-64 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Flow Logs</h2>
            <AnimatePresence>
              {logs.map((log) => (
                <LogEntry key={log.id} log={log} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsletterFlowPage;