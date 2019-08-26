import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const TransientInput = ({
  bgColor,
  value,
  onChange,
  onBlur,
}) => (
  <>
  <InputGroup>
    <FormControl
      value={value}
      onChange={(evt) => onChange(evt.target.value)}
      onBlur={() => onBlur()}
      placeholder="Recipient's username"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
      style={{ backgroundColor: bgColor, border: 0 }}
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