export const simulateRenewal = () => {
    return Math.random() > 0.5;
  };
  
  export const generateUniqueId = () => {
    return `flow-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };