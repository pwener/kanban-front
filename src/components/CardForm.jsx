import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

const CardForm = ({
  addCard,
  ...modalProps,
}) => {
  const [card, setCard] = useState({title: '', content: ''});

  return (
    <div onClick={e => e.stopPropagation()}>
      <Modal {...modalProps}>
        <Modal.Body>
          <h4>Add new card</h4>
          <Form>
            <Form.Group controlId="formGroupTitle">
              <Form.Label>Card title</Form.Label>
              <Form.Control
                placeholder="Choose something significant..."
                value={card.title}
                onChange={evt => setCard({ ...card, title: evt.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formGroupStory">
              <Form.Label>Card content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Content of your card"
                value={card.content}
                onChange={evt => setCard({ ...card, content: evt.target.value })}
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

export default CardForm;