import React from 'react';
import {
  DragDropContext,
} from 'react-beautiful-dnd';
import Layer from './Layer';
import { Container, Row, Alert, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CardForm from './CardForm';
import LayerForm from './LayerForm';

import { updateCardList } from '../actions/card';

import { fetchList } from '../actions';

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
    };
  }

  componentDidMount() {
    this.props.fetchList();
  }

  /**
   * Returns a list of cards
   */
  getList = (id) => {
    const { cards } = this.props;
    return cards.filter(s => s.layer_id === id);
  }

  /**
   * Fired when drop one item
   */
  onDragEnd = (result) => {
    const { source, destination } = result;
    const { updateCardList } = this.props;

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

      const { cards } = this.props;
      const cardsExceptLayer = cards.filter(s => s.layer_id !== layerId);

      updateCardList(
        [...cardsExceptLayer, ...items],
      );
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

      const updatedCards = [].concat(...Object.values(resultAfterMove));

      updateCardList(updatedCards);
      
      this.setState({
        alert: {
          type: 'primary',
          message: 'Story moved in kanban',
          visible: true,
        },
      });
    }
  };

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
    const {
      project,
      cards,
      layers,
    } = this.props;

    const {
      alert,
      isOpenCardFormModal,
      isOpenLayerFormModal
    } = this.state;

    return (
      <>
        <CardForm
          show={isOpenCardFormModal}
          onHide={this.handleCloseCardFormModal}
        />

        <LayerForm
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
                name="Detached"
                stories={cards.filter(s => s.layer_id === -1)}
                isDetached
              />
            </Row>
            <Row className="flex-row flex-sm-nowrap mt-3">
              {
                layers ? layers.map((l, i) => (
                  <Layer
                    key={i} // change to unique field
                    id={l._id}
                    name={l.name}
                    stories={cards.filter(s => s.layer_id === l._id)}
                  />
                )) : null
              }
            </Row>
          </DragDropContext>
        </Container>
      </>
    );
  }
};

const mapStateToProps = store => ({
  layers: store.layerReducer.layers,
  cards: store.cardReducer.cards
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateCardList, fetchList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
