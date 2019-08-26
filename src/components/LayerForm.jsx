import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

const LayerForm = ({
  addLayer,
  ...modalProps,
}) => {
  const [layer, setLayer] = useState('');

  return (
    <div onClick={e => e.stopPropagation()}>
      <Modal {...modalProps}>
        <Modal.Body>
          <h4>Add layer</h4>
          <Form>
            <Form.Group controlId="formGroupTitle">
              <Form.Label>Layer name</Form.Label>
              <Form.Control
                placeholder="Choose something like To Do, Doing, Testing..."
                value={layer.title}
                onChange={evt => setLayer(evt.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addLayer(layer)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LayerForm;