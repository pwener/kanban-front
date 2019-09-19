import React, { useEffect } from 'react';
import Kanban from './components/Kanban';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import socket from './utils/socket-io';
import { addLayer, removeLayer, updateLayer } from './actions/layer';

const App = (props) => {
  const id = 123;
  const title = "Lorem ipsum";
  const project = { name: 'Lorem Ipsum'};
  const isDetached = true;

  // this client just will listen socket actions
  useEffect(() => {
    socket.on("add_list", data => props.addLayer(data));
    socket.on("delete_list", id => props.removeLayer(id));
    socket.on("update_list", data => props.updateLayer(data));
  }, []);

  // TODO remove that
  const opts = { id, title, project, isDetached };

  return (
    <Kanban  {...opts} />
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addLayer, removeLayer, updateLayer }, dispatch);

export default connect(null, mapDispatchToProps)(App);
