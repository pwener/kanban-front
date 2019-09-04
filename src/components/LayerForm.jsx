import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createList } from '../actions';

const LayerForm = ({
  createList,
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
                value={layer.name}
                onChange={evt => setLayer(evt.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createList({name: layer})}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createList: layer => { dispatch(createList(layer)) }
  }
}

export default connect(null, mapDispatchToProps)(LayerForm);