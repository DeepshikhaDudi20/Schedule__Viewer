import React from 'react';
import '../../styles/ScheduleField.scss';

interface ScheduleFieldProps {
  label: string;
  value?: string | number;
  scheduleId: number;
}

const ScheduleField: React.FC<ScheduleFieldProps> = ({ label, value, scheduleId }) => {
  return (
    <div className="schedule-field">
      <span className="schedule-field__label" id={`${scheduleId}-${label}`}>
        {label}:
      </span>
      <p className="schedule-field__value">
        {value}
      </p>
    </div>
  );
};

export default ScheduleField;
