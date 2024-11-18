import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FlowStates } from '../utils/flowStates';
import { simulateRenewal } from '../utils/flowHelpers';

export const useFlowSimulation = () => {
  const [flowState, setFlowState] = useState(FlowStates.IDLE);
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [renewalStatus, setRenewalStatus] = useState(null);

  const addLog = useCallback((message, type = 'info') => {
    const newLog = {
      id: uuidv4(),
      message,
      timestamp: new Date().toLocaleTimeString(),
      type
    };
    
    setLogs(prev => [...prev, newLog]);
  }, []);

  const resetFlow = useCallback(() => {
    setFlowState(FlowStates.IDLE);
    setLogs([]);
    setIsRunning(false);
    setRenewalStatus(null);
  }, []);

  const startFlow = useCallback(async () => {
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
  }, [addLog]);

  return {
    flowState,
    logs,
    isRunning,
    renewalStatus,
    startFlow,
    resetFlow
  };
};