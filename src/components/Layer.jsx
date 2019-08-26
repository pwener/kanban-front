import React, { useState } from 'react';
import {
  Draggable,
  Droppable,
} from 'react-beautiful-dnd';
import { Card as BootstrapCard, Row } from 'react-bootstrap';

import Card from './Card';

const TransientInput = ({
  value,
  onChange,
  onBlur,
}) => (
  <input
    type="text"
    value={value}
    onChange={(evt) => onChange(evt.target.value)}
    onBlur={(evt) => onBlur(evt.target.value)}
    style={{ border: 0 }}
  />
);

/* eslint-disable react/prop-types */
const Layer = ({
    id,
    title,
    stories,
    isDetached,
    deleteLayer,
}) => {
  const [ isEditingTitle, setIsEditingTitle ] = useState(false);
  const [ newTitle, setTitle ] = useState(title);

  return (
    <Droppable droppableId={id}>
      {provided => (
        <div
          ref={provided.innerRef}
          className={isDetached ? 'col-12' : 'col-3'}
          {...provided.droppableProps}
        >
          <BootstrapCard>
            <BootstrapCard.Body>
              <button
                hidden={id === -1}
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => deleteLayer(id)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <BootstrapCard.Title className="text-truncate py-2" onClick={() => setIsEditingTitle(true)}>
                {isEditingTitle ?
                  <TransientInput
                    value={newTitle}
                    onChange={setTitle}
                    onBlur={() => {
                      setIsEditingTitle(false);
                    }}
                  />
                  : title
                }
              </BootstrapCard.Title>
              <Row className={isDetached ? 'row' : ''}>
                { stories.map((card, index) => (
                  <Draggable
                    key={card.id}
                    draggableId={card.id}
                    index={index}
                  >
                    {(provided, snapshot) => 
                      <Card provided={provided} snapshot={snapshot} card={card} />
                    }
                  </Draggable>
                ))}
                { provided.placeholder }
              </Row>
            </BootstrapCard.Body>
          </BootstrapCard>
        </div>
      )}
    </Droppable>
  );
};

export default Layer;