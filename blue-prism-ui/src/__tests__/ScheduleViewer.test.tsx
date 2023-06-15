import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import { axe, toHaveNoViolations } from 'jest-axe';
import ScheduleViewer from '../components/ScheduleDetails/ScheduleViewer';
import { mockSchedules, mockLogEntries } from '../AppData/mock';

expect.extend(toHaveNoViolations);

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('The ScheduleViewer component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render without error', () => {
    render(<ScheduleViewer />);
    expect(screen.getByText('Schedules')).toBeInTheDocument();
  });

  it('should fetch schedules and displays them correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockSchedules });

    render(<ScheduleViewer />);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/schedules');
    });
    expect(screen.getByText('Schedule 1')).toBeInTheDocument();
    expect(screen.getByText('Schedule 2')).toBeInTheDocument();
  });

  test('should select a schedule card when clicked', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockSchedules });
    render(<ScheduleViewer />);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/schedules');
    });

    const scheduleCard = screen.getByTestId('schedule-card-1');
    fireEvent.click(scheduleCard);
    expect(scheduleCard.classList.contains('selected')).toBeTruthy();
  });

  test('should retire a schedule on retire button click and updates its status', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockSchedules });
    render(<ScheduleViewer />);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/schedules');
    });

    const retireButtons = screen.getAllByText('Retire');
    fireEvent.click(retireButtons[0]);
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/schedules/1', {
        isRetired: true,
      });

    });
    expect(screen.getByText('Status: Retired')).toBeInTheDocument();
  });

  test('should fetch schedule log entries and displays them correctly when a schedule is selected', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockSchedules })
      .mockResolvedValueOnce({ data: mockLogEntries });

    render(<ScheduleViewer />);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/schedules');
    });

    const scheduleCard = screen.getByText('Schedule 1');
    fireEvent.click(scheduleCard);
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/schedules');
    });
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/scheduleLogs?scheduleId=1');
    expect(screen.getByText('Schedule Log Entries')).toBeInTheDocument();
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Start Time')).toBeInTheDocument();
    expect(screen.getByText('End Time')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Server Name')).toBeInTheDocument();
    expect(screen.getByText('01/01/2023, 10:00:00')).toBeInTheDocument();
    expect(screen.getByText('01/01/2023, 12:00:00')).toBeInTheDocument();
    expect(screen.getByText('Server 1')).toBeInTheDocument();
    expect(screen.getByText('Server 2')).toBeInTheDocument();
  });

  test('should display an error message when fetching schedules fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
  
    render(<ScheduleViewer />);
  
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/schedules');
    });
  
    expect(screen.getByRole('alert')).toHaveTextContent('Error fetching schedules');
  });
  

  test("should not have any accessibility violations", async () => {
    const { container } = render(<ScheduleViewer />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
