import React from 'react';
import Kanban from './components/Kanban';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const createStory = () => {
    return [
      {id: 1, title: "Manter story", content: "Eu como usuário quero manter uma história de usuário, tal que possa descrever meu backlog", layer_id: 1},
      {id: 2, title: "Manter layer", content: "Eu como usuário quero manter uma layer", layer_id: -1},
      {id: 3, title: "Manter usuário", content: "Eu como usuário quero manter uma conta no sistema", layer_id: -1, color: '#FFF'},
      {id: 4, title: "Manter projeto", content: "Eu como usuário quero manter vários projetos ", layer_id: -1, color: '#03a9f4'},
    ];
  }

  const createLayers = () => {
    return [
      {id: 1, projectName: "lorem_ipsum", name: 'To Do', stories: [] },
      {id: 2, projectName: "lorem_ipsum", name: 'Doing', stories: [] },
      {id: 3, projectName: "lorem_ipsum", name: 'Done', stories: [] },
      {id: 4, projectName: "lorem_ipsum", name: 'Archived', stories: [] },
    ];
  }

  const id = 123;
  const title = "Lorem ipsum";
  const stories = createStory();
  const layers = createLayers();
  const project = { name: 'Lorem Ipsum'};
  const isDetached = true;

  const props = { id, title, stories, layers, project, isDetached };

  return (
    <Kanban  {...props} />
  );
}

export default App;
