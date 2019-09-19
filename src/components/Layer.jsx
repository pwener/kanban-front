import React, { useState } from 'react';
import {
  Draggable,
  Droppable,
} from 'react-beautiful-dnd';
import { Card as BootstrapCard, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteList, updateLayer } from '../actions';

import Card from './Card';
import TransientInput from './TransientInput';

/* eslint-disable react/prop-types */
const Layer = ({
    id,
    name,
    stories,
    isDetached,
    deleteList,
    updateLayer,
}) => {
  const [ isEditingName, setIsEditingName ] = useState(false);
  const [ newName, setName ] = useState(name);

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
                onClick={() => deleteList(id)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <BootstrapCard.Title className="text-truncate py-2" onClick={() => setIsEditingName(true)}>
                {isEditingName && !isDetached ?
                  <TransientInput
                    value={newName}
                    onChange={setName}
                    onBlur={() => {
                      updateLayer({id, stories, name: newName});
                      setIsEditingName(false);
                    }}
                  />
                  : name
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteList, updateLayer}, dispatch);

export default connect(null, mapDispatchToProps)(Layer);