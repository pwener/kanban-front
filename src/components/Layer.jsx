import React, { useState } from 'react';
import {
  Draggable,
  Droppable,
} from 'react-beautiful-dnd';
import { Card as BootstrapCard, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeLayer } from '../actions';

import Card from './Card';
import TransientInput from './TransientInput';

/* eslint-disable react/prop-types */
const Layer = ({
    id,
    title,
    stories,
    isDetached,
    removeLayer,
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
                onClick={() => removeLayer(id)}
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

const mapDispatchToProps = dispatch => {
  return {
    removeLayer: layer => { dispatch(removeLayer(layer)) }
  }
}

export default connect(null, mapDispatchToProps)(Layer);