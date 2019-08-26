import { CARD_ADD, CARD_REMOVE, CARD_UPDATE, CARD_LIST_UPDATE } from '../actions/actionTypes';

const initialState = {
  cards: [
    {id: 1, title: "Manter story", content: "Eu como usuário quero manter uma história de usuário, tal que possa descrever meu backlog", layer_id: 1},
    {id: 2, title: "Manter layer", content: "Eu como usuário quero manter uma layer", layer_id: -1},
    {id: 3, title: "Manter usuário", content: "Eu como usuário quero manter uma conta no sistema", layer_id: -1, color: '#FFF'},
    {id: 4, title: "Manter projeto", content: "Eu como usuário quero manter vários projetos ", layer_id: -1, color: '#03a9f4'},
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CARD_ADD:
      return {
        ...state,
        cards: [...state.cards, action.card]
      };
    case CARD_REMOVE:
      return {
        ...state,
        cards: state.cards.filter(c => c.id !== action.id)
      };
    case CARD_UPDATE:
      return {
        ...state,
        cards: state.cards.map(
          card => card.id === action.card.id ? card = action.card : card,
        )
      }
    case CARD_LIST_UPDATE:
      return {
        ...state,
        layers: action.cards,
      }
    default:
      return state;
  }
};