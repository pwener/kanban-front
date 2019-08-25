import React from 'react';
import CardModal from './CardModal';
import { Card as BootstrapCard } from 'react-bootstrap';

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? '#E4E5E5' : '#f8f9fa',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const isDetached = (id) => id === -1;

const Card = ({ provided, snapshot, story }) => {
  return (
    <BootstrapCard
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(
        snapshot.isDragging,
        provided.draggableProps.style,
      )}
      className={`p-1 m-2 bg-faded ${isDetached(story.layer_id) ? 'col-2' : 'col-11'}`}
      onClick={() => console.info('show') }
    >
      <BootstrapCard.Body>
        <BootstrapCard.Title className="font-weight-bold">
          {story.title}
        </BootstrapCard.Title>
        <BootstrapCard.Text className="font-weight-normal">
          {story.story.slice(0, 50) + '...'}
        </BootstrapCard.Text>
      </BootstrapCard.Body>
      <CardModal {...story} />
    </BootstrapCard>
  );
}

export default Card;