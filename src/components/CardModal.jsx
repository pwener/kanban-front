import React, { useState } from 'react';
import { Modal, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { CirclePicker } from 'react-color';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeCard, updateCard } from '../actions/card';

import TransientInput from './TransientInput';

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
      .modal-footer {
        border-top: 0;
      }
      `}
    </style>

    <Modal {...props} className={`custom-modal-${props.id}`}/>
  </ >
);

const CardModal = ({
  card,
  removeCard,
  updateCard,
  ...modalProps,
}) => {
  const [ currentCard, setCard ] = useState(card);
  const [ isEditingTitle, setIsEditingTitle ] = useState(false);

  return (
    // just to fix onHide bug
    <div onClick={e => e.stopPropagation()}>
      <CustomModal {...modalProps} id={card.id} color={card.color}>
        <Modal.Header closeButton>
          <Modal.Title onClick={() => setIsEditingTitle(true)}>
            {isEditingTitle ?
              <TransientInput
                bgColor={currentCard.color}
                value={currentCard.title}
                onChange={value => setCard({...currentCard, title: value})}
                onBlur={() => {
                  updateCard(currentCard);
                  setIsEditingTitle(false);
                }}
              />
              : currentCard.title
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{card.content}</Modal.Body>
        <Modal.Footer>
          <DropdownButton
            id="dropdown-item-button"
            title="Change color"
            variant="default"
          >
            <Dropdown.Item as="div">
              <CirclePicker
                color={currentCard.color}
                onChangeComplete={(color, _) => updateCard({...currentCard, color: color.hex})}
              />
            </Dropdown.Item>
          </DropdownButton>
          <Button onClick={() => removeCard(card.id)} variant="default">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Modal.Footer>
      </CustomModal>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeCard, updateCard }, dispatch);

export default connect(null, mapDispatchToProps)(CardModal);