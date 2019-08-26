import React from 'react';
import { Modal } from 'react-bootstrap';

/**
 * Custom Component to override background-color
 * 
 * TODO change to SASS
 */
const CustomModal = (props) => (
  <>
    <style type="text/css">
      {`
      .custom-modal-${props.id} > .modal-dialog > .modal-content {
        background-color: ${ props.color };
      }
      .modal-header {
        border-bottom: 0;
      }
      `}
    </style>

    <Modal {...props} className={`custom-modal-${props.id}`}/>
  </ >
);

const CardModal = ({
  card,
  ...modalProps,
}) => (
  // just to fix onHide bug
  <div onClick={e => e.stopPropagation()}>
    <CustomModal {...modalProps} id={card.id} color={card.color}>
      <Modal.Header closeButton>
        <Modal.Title>{card.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{card.content}</Modal.Body>
    </CustomModal>
  </div>
);

export default CardModal;