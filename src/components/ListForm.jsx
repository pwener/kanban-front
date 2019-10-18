import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reqCreateList } from '../actions/list';

const ListForm = ({
  createList,
  onHide,
  ...modalProps,
}) => {
  const [list, setList] = useState('');

  return (
    <div onClick={e => e.stopPropagation()}>
      <Modal {...modalProps}>
        <Modal.Body>
          <h4>Add list</h4>
          <Form>
            <Form.Group controlId="formGroupTitle">
              <Form.Label>List name</Form.Label>
              <Form.Control
                placeholder="Choose something like To Do, Doing, Testing..."
                value={list.name}
                onChange={evt => setList(evt.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              createList({name: list});
              onHide();
          }}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createList: list => { dispatch(reqCreateList(list)) }
  }
}

export default connect(null, mapDispatchToProps)(ListForm);