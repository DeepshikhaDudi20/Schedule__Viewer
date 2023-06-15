import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ScheduleLogEntries from '../components/ScheduleDetails/ScheduleLogEntries';
import { mockLogEntries } from '../AppData/mock';

describe('The ScheduleLogEntries component', () => {
  let mockAxios: MockAdapter;
  const scheduleId = 123;
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('should fetch and display schedule log entries', async () => {
    mockAxios.onGet(`http://localhost:3000/scheduleLogs?scheduleId=${scheduleId}`).reply(200, mockLogEntries);

    render(<ScheduleLogEntries selectedScheduleId={scheduleId} />);

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: '02/01/2023, 09:00:00' })).toBeInTheDocument();
    });
  });

  test('should render null when there are no log entries', async () => {
    mockAxios.onGet(`http://localhost:3000/scheduleLogs?scheduleId=${scheduleId}`).reply(200, []);
  
    render(<ScheduleLogEntries selectedScheduleId={scheduleId} />);
  
    await waitFor(() => {
      expect(screen.queryByText('Schedule Log Entries')).not.toBeInTheDocument();
    });
  });

  test('should render null when selectedScheduleId is null', async () => {
    render(<ScheduleLogEntries selectedScheduleId={null} />);
  
    await waitFor(() => {
      expect(screen.queryByText('Schedule Log Entries')).not.toBeInTheDocument();
    });
  });
  
  test('should filter log entries by status', async () => {
    mockAxios.onGet(`http://localhost:3000/scheduleLogs?scheduleId=${scheduleId}`).reply(200, mockLogEntries);
  
    render(<ScheduleLogEntries selectedScheduleId={scheduleId} />);
  
    await waitFor(() => {
      expect(screen.getByRole('cell', { name: '02/01/2023, 09:00:00' })).toBeInTheDocument();
    });
  
    const selectElement = screen.getByLabelText('Filter by Status:');
    fireEvent.change(selectElement, { target: { value: 'Completed' } });
  
    await waitFor(() => {
      expect(screen.queryByRole('cell', { name: '02/01/2023, 09:00:00' })).not.toBeInTheDocument();
    });
  }); 
});
