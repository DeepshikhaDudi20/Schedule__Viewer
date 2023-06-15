import { Schedule } from '../types/Schedule'

export const mockSchedules: Schedule[] = [
  {
    id: 1,
    name: 'Schedule 1',
    description: 'Schedule 1 description',
    isRetired: false,
    tasksCount: 5,
    startPoint: '2023-06-11',
    endPoint: '2023-06-18',
    dayOfWeek: 1,
    dayOfMonth: 11,
    startDate: '2023-06-01',
    endDate: '2023-06-30',
    timePeriod: 1,
    intervalType: 'daily',
  },
  {
    id: 2,
    name: 'Schedule 2',
    description: 'Schedule 2 description',
    isRetired: false,
    tasksCount: 3,
    startPoint: '2023-06-13',
    endPoint: '2023-06-20',
    dayOfWeek: 3,
    dayOfMonth: 13,
    startDate: '2023-06-01',
    endDate: '2023-06-30',
    timePeriod: 2,
    intervalType: 'weekly',
  },
];

export const mockSchedule: Schedule =
{
  id: 1,
  name: 'Schedule 1',
  description: 'Schedule 1 description',
  isRetired: false,
  tasksCount: 5,
  startPoint: '2023-06-11',
  endPoint: '2023-06-18',
  dayOfWeek: 1,
  dayOfMonth: 11,
  startDate: '2023-06-01',
  endDate: '2023-06-30',
  timePeriod: 1,
  intervalType: 'Daily',
}

export const mockLogEntries = [
  {
    id: 1,
    startTime: '2023-01-01T10:00:00Z',
    endTime: '2023-01-01T12:00:00Z',
    status: 'Completed',
    serverName: 'Server 1',
  },
  {
    id: 2,
    startTime: '2023-01-02T09:00:00Z',
    endTime: '2023-01-02T11:00:00Z',
    status: 'Pending',
    serverName: 'Server 2',
  }]