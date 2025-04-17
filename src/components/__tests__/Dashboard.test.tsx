import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Dashboard } from '../Dashboard';
import { useWebSocket } from '../../hooks/useWebsocket';

jest.mock('react-d3-speedometer', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-speedometer">Speedometer</div>
}));

jest.mock('../../hooks/useWebsocket', () => ({
  useWebSocket: jest.fn()
}));

describe('Dashboard', () => {
  const mockSensors = [
    { id: '1', name: 'Temperature', value: '25.5', unit: '°C', connected: true },
    { id: '2', name: 'Humidity', value: '60', unit: '%', connected: true }
  ];

  beforeEach(() => {
    (useWebSocket as jest.Mock).mockReturnValue({
      sensors: mockSensors,
      wsState: { isConnected: true }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all sensors', () => {
    render(<Dashboard />);
    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-speedometer')).toHaveLength(2);
  });

  it('should handle disconnected sensors', () => {
    const disconnectedSensors = [
      { ...mockSensors[0], connected: false }
    ];
    
    (useWebSocket as jest.Mock).mockReturnValue({ 
      sensors: disconnectedSensors,
      wsState: { isConnected: true }
    });

    render(<Dashboard />);
    expect(screen.getByText(/Temperature \(disconnected\)/i)).toBeInTheDocument();
  }); 
}); 