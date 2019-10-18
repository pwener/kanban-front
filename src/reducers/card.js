import { CARD_ADD, CARD_REMOVE, CARD_UPDATE, CARD_LIST_UPDATE } from '../actions/actionTypes';

const initialState = {
  cards: [
    {id: 1, title: "Manter story", content: "Eu como usuário quero manter uma história de usuário, tal que possa descrever meu backlog", list_id: '5d9562356fd3af164a25e101'},
    {id: 2, title: "Manter list", content: "Eu como usuário quero manter uma list", list_id: -1},
    {id: 3, title: "Manter usuário", content: "Eu como usuário quero manter uma conta no sistema", list_id: -1, color: '#FFF'},
    {id: 4, title: "Manter projeto", content: "Eu como usuário quero manter vários projetos ", list_id: -1, color: '#03a9f4'},
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
        lists: action.cards,
      }
    default:
      return state;
  }
};