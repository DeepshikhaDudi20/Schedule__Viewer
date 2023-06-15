import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ScheduleLog } from '../../types/ScheduleLog';
import { formatDate } from '../../utils/FormatDate';
import Select from '../UI/Select';
import '../../styles/ScheduleLogEntries.scss';

interface ScheduleLogEntriesProps {
  selectedScheduleId: number | null;
}

const ScheduleLogEntries: React.FC<ScheduleLogEntriesProps> = ({ selectedScheduleId }) => {
  const [logEntries, setLogEntries] = useState<ScheduleLog[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<ScheduleLog[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filterEntriesByStatus = useCallback(() => {
    if (statusFilter === 'All') {
      setFilteredEntries(logEntries);
    } else {
      const filtered = logEntries.filter((entry) => entry.status === statusFilter);
      setFilteredEntries(filtered);
    }
  }, [logEntries, statusFilter]);

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ScheduleLog[]>(`http://localhost:3000/scheduleLogs?scheduleId=${selectedScheduleId}`);
        if (response && response.data) {
          setLogEntries(response.data);
        }
      } catch (error) {
        console.error('Error fetching schedule log entries:', error);
      }
    };

    if (selectedScheduleId) {
      fetchData();
    }
  }, [selectedScheduleId]);

  useEffect(() => {
    filterEntriesByStatus();
  }, [logEntries, statusFilter, filterEntriesByStatus]);

  if (logEntries.length === 0) {
    return null;
  }

  return (
    <div className="schedule-log-entries">
      <h2 className="schedule-log-entries__header">Schedule Log Entries</h2>
      <div className="schedule-log-entries__filter-container">
        <Select
          label="Filter by Status:"
          options={[
            { value: 'All', label: 'All' },
            { value: 'Completed', label: 'Completed' },
            { value: 'Pending', label: 'Pending' },
            { value: 'Running', label: 'Running' },
            { value: 'Exception', label: 'Exception' },
            { value: 'Terminated', label: 'Terminated' },
          ]}
          component="schedule-log-entries"
          value={statusFilter}
          onChange={handleStatusFilterChange}
        />
      </div>
      <table className="schedule-log-entries__table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Status</th>
            <th scope="col">Server Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{formatDate(entry.startTime)}</td>
              <td>{formatDate(entry.endTime)}</td>
              <td>{entry.status}</td>
              <td>{entry.serverName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleLogEntries;
