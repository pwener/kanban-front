import React, { useState } from 'react';
import CardModal from './CardModal';
import { Card as BootstrapCard } from 'react-bootstrap';

const getItemStyle = (isDragging, draggableStyle, bgColor) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  // TODO apply darken function when is draggging
  background: isDragging ? bgColor : bgColor,

  // styles we need to apply on draggables
  ...draggableStyle,
});

const isDetached = (id) => id === -1;

const Card = ({ provided, snapshot, card }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <BootstrapCard
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(
        snapshot.isDragging,
        provided.draggableProps.style,
        card.color
      )}
      className={`p-1 m-2 bg-faded ${isDetached(card.layer_id) ? 'col-2' : 'col-11'}`}
      onClick={handleShow}
    >
      <BootstrapCard.Body>
        <BootstrapCard.Title className="font-weight-bold">
          {card.title}
        </BootstrapCard.Title>
        <BootstrapCard.Text className="font-weight-normal">
          {card.content.slice(0, 50) + '...'}
        </BootstrapCard.Text>
      </BootstrapCard.Body>
      <CardModal card={card} show={show} onHide={handleClose} />
    </BootstrapCard>
  );
}

export default Card;