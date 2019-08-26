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
        // layers: state.layers.filter(l => l.id !== action.layer)
      };
    case CARD_UPDATE:
      return {
        ...state,
        // layers: state.layers.map(
        //   layer => layer.id === action.layer.id ? layer = action.layer : layer
        // )
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