import React, { useEffect } from 'react';
import Kanban from './components/Kanban';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import socket from './utils/socket-io';
import { addList, removeList, updateList } from './actions/list';

const App = (props) => {
  const id = 123;
  const title = "Lorem ipsum";
  const project = { name: 'Lorem Ipsum'};
  const isDetached = true;

  // this client just will listen socket actions
  useEffect(() => {
    socket.on("add_list", data => props.addList(data));
    socket.on("delete_list", id => props.removeList(id));
    socket.on("update_list", data => props.updateList(data));
  }, []);

  // TODO remove that
  const opts = { id, title, project, isDetached };

  return (
    <Kanban  {...opts} />
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addList, removeList, updateList }, dispatch);

export default connect(null, mapDispatchToProps)(App);
