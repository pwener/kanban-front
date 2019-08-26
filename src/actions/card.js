import { CARD_ADD, CARD_REMOVE, CARD_UPDATE, CARD_LIST_UPDATE } from '../actions/actionTypes';

const addCard = (card) => ({
  type: CARD_ADD,
  card
});

const removeCard = (id) => ({
  type: CARD_REMOVE,
  layer: id,
});

const updateCard = (card) => ({
  type: CARD_UPDATE,
  card
});

const updateCardList = (cards) => ({
  type: CARD_LIST_UPDATE,
  cards,
})

export {
  addCard,
  removeCard,
  updateCard,
  updateCardList
};