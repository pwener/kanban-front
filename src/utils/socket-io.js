import socketIOClient from "socket.io-client";

const endpoint = 'http://localhost:8000'; // TODO get from env

export default socketIOClient.connect(endpoint);


