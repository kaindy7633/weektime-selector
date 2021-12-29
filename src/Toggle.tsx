import React from 'react';
import './Toggle.css';

export type ToggleType = {
  isOn: boolean;
  handleChange: () => void;
};

export const Toggle: React.FC<ToggleType> = ({ isOn, handleChange }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={isOn} onChange={handleChange} />
      <span className="slider round"></span>
    </label>
  );
};
