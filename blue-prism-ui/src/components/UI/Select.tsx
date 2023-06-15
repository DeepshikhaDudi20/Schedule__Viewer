import React from 'react';
import '../../styles/Select.scss';

interface SelectProps {
  label: string;
  component: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, component, value, onChange }) => {
  // Render the component
  return (
    <div className="select-filter">
      <label className="select-filter__label" htmlFor={`filter-select-${component}`}>
        {label}
      </label>
      <select
        className="select-filter__select"
        id={`filter-select-${component}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
