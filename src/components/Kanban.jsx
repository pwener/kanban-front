import React from 'react';
import {
  DragDropContext,
} from 'react-beautiful-dnd';
import Layer from './Layer';

/**
 * Help to reordering the result
 */ 
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);

  const [removed] = sourceClone.splice(droppableSource.index, 1);

  // update layer
  removed.layer_id = droppableDestination.droppableId;

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const initialState = {
  alert: {
    type: '',
    message: '',
    visible: false,
  },
};

class Kanban extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: initialState.alert,
      error: null,
      stories: this.updateEmptyId(props.stories),
      layers: props.layers,
    };
  }

  /**
   * Generate new array with non-nullable values
   */
  updateEmptyId = (stories) => {
    const list = [];

    stories.forEach((s) => {
      if (s.layer_id === null) {
        list.push(Object.assign(s, { layer_id: -1 }));
      }
    });
    return stories;
  }

  /**
   * Returns a list of stories
   */
  getList = (id) => {
    const { stories } = this.state;
    return stories.filter(s => s.layer_id === id);
  }

  /**
   * Fired when drop one item
   */
  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const layerId = source.droppableId;

      const items = reorder(
        this.getList(layerId),
        source.index,
        destination.index,
      );

      const { stories } = this.state;
      const storiesExceptLayer = stories.filter(s => s.layer_id !== layerId);

      this.setState({
        stories: [...storiesExceptLayer, ...items],
      });
    } else {
      const sourceId = source.droppableId;
      const destinationId = destination.droppableId;

      // get story before move
      const story = this.getList(sourceId)[source.index];

      // should submit story

      const resultAfterMove = move(
        this.getList(sourceId),
        this.getList(destinationId),
        source,
        destination,
      );

      const updatedStories = [].concat(...Object.values(resultAfterMove));

      this.setState(prevState => ({
        stories: [...prevState.stories, updatedStories],
        alert: {
          type: 'primary',
          message: 'Story moved in kanban',
          visible: true,
        },
      }));
    }
  };

  /**
   * Clean alert object
   */
  dismissAlert = () => this.setState({ alert: initialState.alert });

  render() {
    const { project } = this.props;
    const {
      stories,
      layers,
      alert,
    } = this.state;

    return (
      <div className="container-fluid pt-3">
        <div className="row">
          <div className="col-md-auto">
            <h3>
              {project.name} <small>Kanban</small>
            </h3>
          </div>
        </div>

        { alert.visible ? (
          <div className="row">
            <div className={`alert alert-${alert.type} alert-dismissible w-100 mt-3`} role="alert">
              {alert.message}
              <button
                onClick={() => this.dismissAlert()}
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        ) : null
        }

        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="row mt-3">
            <Layer
              id={-1} // just to notify that is a unvalid layer
              title="Detached"
              stories={stories.filter(s => s.layer_id === -1)}
              isDetached
            />
          </div>
          <div className="row flex-row flex-sm-nowrap mt-3">
            {
              layers.map(l => (
                <Layer
                  id={l.id}
                  title={l.name}
                  stories={stories.filter(s => s.layer_id === l.id)}
                />
              ))
            }
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default Kanban;
