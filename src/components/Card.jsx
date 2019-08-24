import React from 'react';

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? '#E4E5E5' : '#f8f9fa',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const isDetached = (id) => id === -1;

const Card = ({ provided, snapshot, story }) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={getItemStyle(
      snapshot.isDragging,
      provided.draggableProps.style,
    )}
    className={`card p-1 m-2 bg-faded ${isDetached(story.layer_id) ? 'col-2' : 'col-11'}`}
  >
    <div class="card-body">
      <h5 className="card-title font-weight-bold">
        {story.title}
      </h5>
      <span className="card-text font-weight-normal">
        {story.story.slice(0, 50) + '...'}
      </span>
    </div>
  </div>
);

export default Card;