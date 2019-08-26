import React from 'react';
import Kanban from './components/Kanban';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const id = 123;
  const title = "Lorem ipsum";
  const project = { name: 'Lorem Ipsum'};
  const isDetached = true;

  const props = { id, title, project, isDetached };

  return (
    <Kanban  {...props} />
  );
}

export default App;
