import React from 'react';
import { InputGroup, Button } from 'react-bootstrap';

const TransientInput = ({
  bgColor,
  value,
  onChange,
  onBlur,
}) => (
  <>
  <InputGroup>
    <input
      value={value}
      onChange={(evt) => onChange(evt.target.value)}
      onBlur={() => onBlur()}
      style={{
        backgroundColor: bgColor,
        border: 'solid 1px #6c757d',
        paddingLeft: '2%',
        width: '80%'
      }}
      size="lg"
    />
    <InputGroup.Append>
      {/* In fact, this button would not needed... 
      We should wait for this PR: 
      https://github.com/facebook/react/issues/6410 */}
      <Button variant="outline-secondary" onClick={() => onBlur()}>
        Save
      </Button>
    </InputGroup.Append>
  </InputGroup>
  </>
);

export default TransientInput;