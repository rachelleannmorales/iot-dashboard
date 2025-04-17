import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReconnectingOverlay from '../ReconnectingOverlay';

describe('ReconnectingOverlay', () => {
  it('should render when reconnecting', () => {
    render(<ReconnectingOverlay isReconnecting={true} />);
    expect(screen.getByText('Reconnecting...')).toBeInTheDocument();
  });

  it('should not render when not reconnecting', () => {
    render(<ReconnectingOverlay isReconnecting={false} />);
    expect(screen.queryByText('Reconnecting...')).not.toBeInTheDocument();
  });
}); 