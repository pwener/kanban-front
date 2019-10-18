import React from 'react';
import {
  DragDropContext,
} from 'react-beautiful-dnd';
import List from './List';
import { Container, Row, Alert, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CardForm from './CardForm';
import ListForm from './ListForm';

import { updateCardList } from '../actions/card';

import { reqFetchList } from '../actions/list';

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

  // update list
  removed.list_id = droppableDestination.droppableId;

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
    isOpenListFormModal: false,
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
    this.props.reqFetchList();
  }

  /**
   * Returns a list of cards
   */
  getList = (id) => {
    const { cards } = this.props;
    return cards.filter(s => s.list_id === id);
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
      const listId = source.droppableId;

      const items = reorder(
        this.getList(listId),
        source.index,
        destination.index,
      );

      const { cards } = this.props;
      const cardsExceptList = cards.filter(s => s.list_id !== listId);

      updateCardList(
        [...cardsExceptList, ...items],
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
  
  handleOpenListModal = () => this.setState({ isOpenListFormModal: true });
  handleCloseListModal = () => this.setState({ isOpenListFormModal: false });

  render() {
    const {
      project,
      cards,
      lists,
    } = this.props;

    const {
      alert,
      isOpenCardFormModal,
      isOpenListFormModal
    } = this.state;

    return (
      <>
        <CardForm
          show={isOpenCardFormModal}
          onHide={this.handleCloseCardFormModal}
        />

        <ListForm
          show={isOpenListFormModal}
          onHide={this.handleCloseListModal}
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
                onClick={this.handleOpenListModal}
              >
                Add List <FontAwesomeIcon icon={faPlus} />
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
              <List
                id={-1} // just to notify that is a unvalid list
                name="Detached"
                stories={cards.filter(s => s.list_id === -1)}
                isDetached
              />
            </Row>
            <Row className="flex-row flex-sm-nowrap mt-3">
              {
                lists ? lists.map((l, i) => (
                  <List
                    key={i} // change to unique field
                    id={l._id}
                    name={l.name}
                    stories={cards.filter(s => s.list_id === l._id)}
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
  lists: store.listReducer.lists,
  cards: store.cardReducer.cards
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateCardList, reqFetchList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
