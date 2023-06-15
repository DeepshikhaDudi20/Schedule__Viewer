import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ScheduleList from './ScheduleList';
import ScheduleLogEntries from './ScheduleLogEntries';
import { Schedule } from '../../types/Schedule';
import '../../styles/ScheduleViewer.scss';

const ScheduleViewer: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get<Schedule[]>('http://localhost:3000/schedules');
        if (isMounted && response && response.data) {
          setSchedules(response.data);
        }
      } catch (error) {
        setError(`Error fetching schedules: ${error}`);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleScheduleSelect = useCallback((scheduleId: number) => {
    setSelectedScheduleId(scheduleId);
  }, []);

  const handleRetireToggle = useCallback(async (scheduleId: number, isRetired: boolean) => {
    try {
      const updatedSchedules = schedules.map((schedule) => {
        if (schedule.id === scheduleId) {
          return { ...schedule, isRetired };
        }
        return schedule;
      });

      await axios.put(`http://localhost:3000/schedules/${scheduleId}`, { isRetired });
      setSchedules(updatedSchedules);
    } catch (error) {
      setError(`Error updating schedule: ${error}`);
    }
  }, [schedules]);

  if (error) {
    return (
      <div role="alert" className="error-message">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="schedule-viewer">
      <ScheduleList
        schedules={schedules}
        selectedScheduleId={selectedScheduleId}
        onSelect={handleScheduleSelect}
        onRetireToggle={handleRetireToggle}
      />
      <ScheduleLogEntries selectedScheduleId={selectedScheduleId} />
    </div>
  );
};

export default ScheduleViewer;
  