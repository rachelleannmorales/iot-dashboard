import React from 'react';

interface ReconnectingOverlayProps {
  isReconnecting: boolean;
}

const ReconnectingOverlay: React.FC<ReconnectingOverlayProps> = ({ isReconnecting }) => {
  if (!isReconnecting) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-black/60 text-white p-4 z-50 flex items-center justify-center gap-3 h-screen">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      <span>Reconnecting...</span>
    </div>
  );
};

export default ReconnectingOverlay; 