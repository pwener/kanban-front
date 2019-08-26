import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addLayer } from '../actions';

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
          <Button onClick={() => addLayer({id: 7, projectName: "lorem_ipsum", name: layer, stories: []})}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addLayer: layer => { dispatch(addLayer(layer)) }
  }
}

export default connect(null, mapDispatchToProps)(LayerForm);