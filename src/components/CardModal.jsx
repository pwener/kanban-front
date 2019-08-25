import React from 'react';
import { Modal } from 'react-bootstrap';

const CardModal = ({
  story,
  ...modalProps,
}) => (
  // fix onHide bug
  <div onClick={e => e.stopPropagation()}>
    <Modal {...modalProps}>
      <Modal.Header closeButton>
        <Modal.Title>{story.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{story.story}</Modal.Body>
    </Modal>
  </div>
);

export default CardModal;