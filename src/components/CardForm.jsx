import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { CirclePicker } from 'react-color';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import { addCard } from '../actions/card';

const initialCard = {
  title: '',
  content: '',
  color: '',
  list_id: -1,
};

const CardForm = ({
  addCard,
  ...modalProps,
}) => {
  const [card, setCard] = useState(initialCard);

  const handleChangeCard = (evt, attr) => setCard({ ...card, [attr]: evt.target.value })

  return (
    <div onClick={e => e.stopPropagation()}>
      <Modal {...modalProps}>
        <Modal.Body>
          <h4>Add card</h4>
          <Form>
            <Form.Group controlId="formGroupTitle">
              <Form.Label>Card title</Form.Label>
              <Form.Control
                placeholder="Choose something significant..."
                value={card.title}
                onChange={evt => handleChangeCard(evt, 'title')}
              />
            </Form.Group>
            <Form.Group controlId="formGroupStory">
              <Form.Label>Card content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Content of your card"
                value={card.content}
                onChange={evt => handleChangeCard(evt, 'content')}
              />
            </Form.Group>
            <Form.Group controlId="formGroupStory">
              <Form.Label>Card color</Form.Label>
              <CirclePicker
                color={card.color}
                onChangeComplete={(color, _) => setCard({ ...card, color: color.hex })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addCard(card)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


const mapDispatchToProps = dispatch =>
  bindActionCreators({ addCard }, dispatch);

export default connect(null, mapDispatchToProps)(CardForm);