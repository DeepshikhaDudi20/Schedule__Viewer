import { Schedule } from '../../types/Schedule';
import { scheduleData } from '../../AppData/scheduleData';
import ScheduleField from '../UI/ScheduleField';
import '../../styles/ScheduleCard.scss';

interface ScheduleCardProps {
  schedule: Schedule;
  isSelected: boolean;
  onSelect: (scheduleId: number) => void;
  onRetireToggle: (scheduleId: number, isRetired: boolean) => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  schedule,
  isSelected,
  onSelect,
  onRetireToggle,
}) => {
  const handleCardClick = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest('.schedule-card__toggle-button')) {
      onRetireToggle(schedule.id, !schedule.isRetired);
    } else {
      onSelect(schedule.id);
    }
  };

  return (
    <div
      className={`schedule-card ${isSelected ? 'selected' : ''} ${schedule.isRetired ? 'retired' : ''
        }`}
      onClick={handleCardClick}
      onKeyDown={handleCardClick}
      tabIndex={0}
      data-testid={`schedule-card-${schedule.id}`}
      aria-label={schedule.name}
    >
      <h3>{schedule.name}</h3>
      <ScheduleField label="Description" value={schedule.description} scheduleId={schedule.id} />
      <div className="schedule-card__details">
        <ScheduleField label={scheduleData.startPointLabel} value={schedule.startPoint} scheduleId={schedule.id} />
        <ScheduleField label={scheduleData.endPointLabel} value={schedule.endPoint} scheduleId={schedule.id} />
        <ScheduleField label={scheduleData.dayOfWeekLabel} value={schedule.dayOfWeek} scheduleId={schedule.id} />
        <ScheduleField label={scheduleData.dayOfMonthLabel} value={schedule.dayOfMonth} scheduleId={schedule.id} />
        <ScheduleField label={scheduleData.startDateLabel} value={schedule.startDate} scheduleId={schedule.id} />
        <ScheduleField label={scheduleData.endDateLabel} value={schedule.endDate} scheduleId={schedule.id} />
        <ScheduleField label={scheduleData.timePeriodLabel} value={schedule.timePeriod} scheduleId={schedule.id} />
        <ScheduleField label={scheduleData.intervalTypeLabel} value={schedule.intervalType} scheduleId={schedule.id} />
      </div>
      <div className="schedule-card__actions">
        <p className="schedule-card__status" aria-live="polite">
          Status: {schedule.isRetired ? 'Retired' : 'Active'}
        </p>
        <div className="schedule-card__button-container">
          <button
            className="schedule-card__toggle-button"
            data-testid={`retire-toggle-button-${schedule.id}`}
            onClick={() => onRetireToggle(schedule.id, !schedule.isRetired)}
          >
            {schedule.isRetired ? 'Unretire' : 'Retire'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
