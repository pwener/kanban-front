import React from 'react';
import {
  DragDropContext,
} from 'react-beautiful-dnd';
import Layer from './Layer';
import { Container, Row, Alert, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CardForm from './CardForm';
import LayerForm from './LayerForm';

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
    isOpenCardFormModal: false,
    isOpenLayerFormModal: false,
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
      // const story = this.getList(sourceId)[source.index];

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
   * Add new card to detached layer
   */
  addCard = (newCard) => {
    // TODO should dismiss modal
    this.setState((prevState) => ({
      stories: [
        ...prevState.stories,
        { ...newCard,
          layer_id: -1, // ever go to detached
          id: 7 // should be request for api
        }
      ],
    }));
  };

  addLayer = (newLayer) => {
    // TODO should dismiss modal
    this.setState(prevState => ({
      layers: [
        ...prevState.layers,
        { id: 7, 
          projectName: "lorem_ipsum",
          name: newLayer,
          stories: [] 
        },
      ]
    }));
  }

  deleteLayer = (id) => {
    // show alert after request
    // change stories in this layer to detached
    this.setState(prevState => ({
      layers: prevState.layers.filter(l => l.id !== id),
    }));
  }

  /**
   * Clean alert object
   */
  dismissAlert = () => this.setState({ alert: initialState.alert });

  // Card form modal controls
  handleCloseCardFormModal = () => this.setState({ isOpenCardFormModal: false });
  handleOpenCardFormModal = () => this.setState({ isOpenCardFormModal: true });
  
  handleOpenLayerModal = () => this.setState({ isOpenLayerFormModal: true });
  handleCloseLayerModal = () => this.setState({ isOpenLayerFormModal: false });

  render() {
    const { project } = this.props;
    const {
      stories,
      layers,
      alert,
      isOpenCardFormModal,
      isOpenLayerFormModal
    } = this.state;

    return (
      <>
        <CardForm
          addCard={this.addCard}
          show={isOpenCardFormModal}
          onHide={this.handleCloseCardFormModal}
        />
        <LayerForm
          addLayer={this.addLayer}
          show={isOpenLayerFormModal}
          onHide={this.handleCloseLayerModal}
        />
        <Container fluid className="pt-3">
          <Row>
            <Col md="4">
              <h3>
                {project.name} <small>Kanban</small>
              </h3>
            </Col>
            <Col md={{ span: 2, offset: 6 }}>
              <Button
                variant="outline-primary"
                onClick={this.handleOpenCardFormModal}
                style={{ marginRight: '1%'}}
              >
                Add Card <FontAwesomeIcon icon={faPlus} />
              </Button>
              <Button
                variant="outline-primary"
                onClick={this.handleOpenLayerModal}
              >
                Add Layer <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Col>
          </Row>
          { alert.visible ? (
            <Row>
              <Alert
                dismissible
                show={alert.visible}
                variant={alert.type}
                className="w-100 mt-3"
              >
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
              </Alert>
            </Row>
          ) : null}

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Row className="mt-3">
              <Layer
                id={-1} // just to notify that is a unvalid layer
                title="Detached"
                stories={stories.filter(s => s.layer_id === -1)}
                isDetached
              />
            </Row>
            <Row className="flex-row flex-sm-nowrap mt-3">
              {
                layers.map((l, i) => (
                  <Layer
                    key={i} // change to unique field
                    id={l.id}
                    title={l.name}
                    stories={stories.filter(s => s.layer_id === l.id)}
                    deleteLayer={this.deleteLayer}
                  />
                ))
              }
            </Row>
          </DragDropContext>
        </Container>
      </>
    );
  }
}

export default Kanban;
