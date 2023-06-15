import { render, fireEvent, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { mockSchedule } from '../AppData/mock';
import ScheduleCard from '../components/ScheduleDetails/ScheduleCard';

expect.extend(toHaveNoViolations);

describe('The ScheduleCard Component', () => {

  test('renders schedule card with correct details', () => {
    render(
      <ScheduleCard
        schedule={mockSchedule}
        isSelected={false}
        onSelect={() => { }}
        onRetireToggle={() => { }}
      />
    );

    expect(screen.getByText('Schedule 1')).toBeInTheDocument();
    expect(screen.getByText('Schedule 1 description')).toBeInTheDocument();
    expect(screen.getByText('2023-06-11')).toBeInTheDocument();
    expect(screen.getByText('2023-06-18')).toBeInTheDocument();
    expect(screen.getByText('Daily')).toBeInTheDocument();

    const scheduleCard = screen.getByTestId(`schedule-card-${mockSchedule.id}`);

    expect(scheduleCard).not.toHaveClass('selected');
    expect(scheduleCard).not.toHaveClass('retired');
  });

  test('renders selected and retired schedule card correctly', () => {
    render(
      <ScheduleCard
        schedule={mockSchedule}
        isSelected={true}
        onSelect={() => { }}
        onRetireToggle={() => { }}
      />
    );

    const scheduleCard = screen.getByTestId('schedule-card-1');
    expect(scheduleCard).toHaveClass('selected');
    expect(scheduleCard).not.toHaveClass('retired');
  });

  test('calls onSelect callback when schedule card is clicked', () => {
    const onSelectMock = jest.fn();
    render(
      <ScheduleCard
        schedule={mockSchedule}
        isSelected={false}
        onSelect={onSelectMock}
        onRetireToggle={() => { }}
      />
    );

    const scheduleCard = screen.getByTestId('schedule-card-1');
    fireEvent.click(scheduleCard);
    expect(onSelectMock).toHaveBeenCalledWith(1);
  });

  test('calls onRetireToggle callback when retire toggle button is clicked', () => {
    const onRetireToggleMock = jest.fn();
    render(
      <ScheduleCard
        schedule={mockSchedule}
        isSelected={false}
        onSelect={() => { }}
        onRetireToggle={onRetireToggleMock}
      />
    );

    const toggleButton = screen.getByTestId(`retire-toggle-button-${mockSchedule.id}`);
    fireEvent.click(toggleButton);
    expect(onRetireToggleMock).toHaveBeenCalledWith(mockSchedule.id, true);
  });


  test('renders retired schedule card correctly', () => {
    render(
      <ScheduleCard
        schedule={{ ...mockSchedule, isRetired: true }}
        isSelected={false}
        onSelect={() => { }}
        onRetireToggle={() => { }}
      />
    );

    const scheduleCard = screen.getByTestId('schedule-card-1');
    expect(scheduleCard).toHaveClass('retired');
  });

  test("should not have any accessibility violations", async () => {
    const { container } = render(
      <ScheduleCard
        schedule={{ ...mockSchedule, isRetired: true }}
        isSelected={false}
        onSelect={() => { }}
        onRetireToggle={() => { }}
      />
    );;
    expect(await axe(container)).toHaveNoViolations();
  });
});
