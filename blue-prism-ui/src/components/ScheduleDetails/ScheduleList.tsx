import { useState } from 'react';
import { Schedule } from '../../types/Schedule';
import ScheduleCard from './ScheduleCard';
import '../../styles/ScheduleList.scss';
import Select from '../UI/Select';

interface ScheduleListProps {
  schedules: Schedule[];
  selectedScheduleId: number | null;
  onSelect: (scheduleId: number) => void;
  onRetireToggle: (scheduleId: number, isRetired: boolean) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  schedules,
  selectedScheduleId,
  onSelect,
  onRetireToggle,
}) => {
  const [filterStatus, setFilterStatus] = useState<'active' | 'retired' | 'all'>('all');

  const filteredSchedules = schedules.filter((schedule) => {
    if (filterStatus === 'all') {
      return true;
    }
    if (filterStatus === 'active') {
      return !schedule.isRetired;
    }
    if (filterStatus === 'retired') {
      return schedule.isRetired;
    }
    return true;
  });

  return (
    <div className="schedule-list" data-testid="schedule-list">
      <h2 className="schedule-list__header">Schedules</h2>
      <div className="schedule-list__filter-by">
        <Select
          label="Filter by Status:"
          options={[
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'retired', label: 'Retired' },
          ]}
          component="schedule-list"
          value={filterStatus}
          onChange={(value) => setFilterStatus(value as 'active' | 'retired' | 'all')}
        />
      </div>
      {filteredSchedules.map((schedule) => (
        <ScheduleCard
          key={schedule.id}
          schedule={schedule}
          isSelected={schedule.id === selectedScheduleId}
          onSelect={onSelect}
          onRetireToggle={onRetireToggle}
        />
      ))}
    </div>
  );
};

export default ScheduleList;
