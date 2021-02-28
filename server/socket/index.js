module.exports = (serverIO) => {
  serverIO.on('connection', (socket) =>
    console.log('New connection from socket', socket.id)
  );
};
