import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { mockSchedules } from '../AppData/mock';
import ScheduleList from '../components/ScheduleDetails/ScheduleList';

expect.extend(toHaveNoViolations);
const mockOnSelect = jest.fn();
const mockOnRetireToggle = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('The ScheduleList Component', () => {
  test('shoukd render the schedule list', () => {
    render(
      <ScheduleList
        schedules={mockSchedules}
        selectedScheduleId={null}
        onSelect={mockOnSelect}
        onRetireToggle={mockOnRetireToggle}
      />
    );

    const scheduleListElement = screen.getByTestId('schedule-list');
    expect(scheduleListElement).toBeInTheDocument();

    const scheduleItems = screen.getAllByTestId(/^schedule-card-/);
    expect(scheduleItems.length).toBe(mockSchedules.length);
  });

  test('should calls onSelect when a schedule is clicked', () => {
    render(
      <ScheduleList
        schedules={mockSchedules}
        selectedScheduleId={null}
        onSelect={mockOnSelect}
        onRetireToggle={mockOnRetireToggle}
      />
    );

    const scheduleItem = screen.getByTestId('schedule-card-1');
    fireEvent.click(scheduleItem);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });

  test('should calls onRetireToggle when the retire button is clicked', () => {
    render(
      <ScheduleList
        schedules={mockSchedules}
        selectedScheduleId={null}
        onSelect={mockOnSelect}
        onRetireToggle={mockOnRetireToggle}
      />
    );

    const retireButton = screen.getByTestId('retire-toggle-button-1');
    fireEvent.click(retireButton);

    expect(mockOnRetireToggle).toHaveBeenCalledTimes(2);
    expect(mockOnRetireToggle).toHaveBeenCalledWith(1, true);
  });

  test('should displays the correct schedule details', () => {
    render(
      <ScheduleList
        schedules={mockSchedules}
        selectedScheduleId={null}
        onSelect={mockOnSelect}
        onRetireToggle={mockOnRetireToggle}
      />
    );

    const scheduleName1 = screen.getByText('Schedule 1');
    expect(scheduleName1).toBeInTheDocument();
    const scheduleName2 = screen.getByText('Schedule 2');
    expect(scheduleName2).toBeInTheDocument();

    const scheduleDescription1 = screen.getByText('Schedule 1 description');
    expect(scheduleDescription1).toBeInTheDocument();
    const scheduleDescription2 = screen.getByText('Schedule 2 description');
    expect(scheduleDescription2).toBeInTheDocument();
  });

  test('should filters schedules by status', () => {
    render(
      <ScheduleList
        schedules={mockSchedules}
        selectedScheduleId={null}
        onSelect={mockOnSelect}
        onRetireToggle={mockOnRetireToggle}
      />
    );
    const filterSelect = screen.getByLabelText(/filter by status/i);
    fireEvent.change(filterSelect, { target: { value: 'active' } });

    const scheduleItems = screen.getAllByTestId(/^schedule-card-/);
    expect(scheduleItems.length).toBe(2);
    expect(scheduleItems[0].textContent).toContain('Schedule 1');

    fireEvent.change(filterSelect, { target: { value: 'Retired' } });
    const retireScheduleItems = screen.getAllByTestId(/^schedule-card-/);
    expect(retireScheduleItems.length).toBe(2);
  });

  test('should display the correct schedule status', () => {
    render(
      <ScheduleList
        schedules={mockSchedules}
        selectedScheduleId={null}
        onSelect={mockOnSelect}
        onRetireToggle={mockOnRetireToggle}
      />
    );

    const activeScheduleStatus = screen.getAllByText(/Status: Active/);
    expect(activeScheduleStatus.length).toBe(2);
  });

  test('should display the correct retire button text', () => {
    render(
      <ScheduleList
        schedules={mockSchedules}
        selectedScheduleId={null}
        onSelect={mockOnSelect}
        onRetireToggle={mockOnRetireToggle}
      />
    );

    const activeRetireButton = screen.getByTestId('retire-toggle-button-1');
    expect(activeRetireButton).toHaveTextContent('Retire');

    const retiredRetireButton = screen.getByTestId('retire-toggle-button-2');
    expect(retiredRetireButton).toHaveTextContent('Retire');
  });

  test("should not have any accessibility violations", async () => {
    const { container } = render(
      <ScheduleList
        schedules={mockSchedules}
        selectedScheduleId={null}
        onSelect={mockOnSelect}
        onRetireToggle={mockOnRetireToggle}
      />
    );;
    expect(await axe(container)).toHaveNoViolations();
  });
});