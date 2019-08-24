import React from 'react';
import {
  Draggable,
  Droppable,
} from 'react-beautiful-dnd';

import Card from './Card';

/* eslint-disable react/prop-types */
const Layer = ({
    id,
    title,
    stories,
    isDetached,
}) => (
  <Droppable droppableId={id}>
    {provided => (
      <div
        ref={provided.innerRef}
        className={isDetached ? 'col-12' : 'col-3'}
        {...provided.droppableProps}
      >
        <div className="card">
          <div className="card-body">
            <button
              hidden={id === -1}
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="card-title text-truncate py-2">
              {title}
            </h4>
            <div className={isDetached ? 'row' : ''}>
              { stories.map((story, index) => (
                <Draggable
                  key={story.id}
                  draggableId={story.id}
                  index={index}
                >
                  {(provided, snapshot) => 
                    <Card provided={provided} snapshot={snapshot} story={story} />
                  }
                </Draggable>
              ))}
              { provided.placeholder }
            </div>
          </div>
        </div>
      </div>
    )}
  </Droppable>
);

export default Layer;