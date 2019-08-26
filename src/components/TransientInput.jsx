import React from 'react';

const TransientInput = ({
  value,
  onChange,
  onBlur,
}) => (
  <input
    type="text"
    value={value}
    onChange={(evt) => onChange(evt.target.value)}
    onBlur={(evt) => onBlur(evt.target.value)}
    style={{ border: 0 }}
  />
);

export default TransientInput;