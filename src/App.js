import React from 'react';
import Kanban from './components/Kanban';


function App() {
  const createStory = () => {
    return [
      {id: 1, title: "Manter story", story: "Eu como usuário quero manter uma história de usuário, tal que possa descrever meu backlog", layer_id: 1},
      {id: 2, title: "Manter layer", story: "Eu como usuário quero manter uma layer", layer_id: -1},
      {id: 3, title: "Manter usuário", story: "Eu como usuário quero manter uma conta no sistema", layer_id: -1},
      {id: 4, title: "Manter projeto", story: "Eu como usuário quero manter vários projetos ", layer_id: -1},
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
