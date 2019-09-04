import React, { useEffect } from 'react';
import Kanban from './components/Kanban';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import socket from './utils/socket-io';
import { addLayer } from './actions/layer';

const App = (props) => {
  const id = 123;
  const title = "Lorem ipsum";
  const project = { name: 'Lorem Ipsum'};
  const isDetached = true;

  useEffect(() => {
    socket.on("new list created", data => props.addLayer(data));
  }, []);

  // TODO remove that
  const opts = { id, title, project, isDetached };

  return (
    <Kanban  {...opts} />
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addLayer }, dispatch);

export default connect(null, mapDispatchToProps)(App);
