module.exports = (serverIO) => {
  serverIO.on('connection', (socket) => {
    socket.join('allViewers');
    socket.on('sendHighlight', (elementId) =>
      serverIO.in('allViewers').emit('displayHighlight', elementId)
    );
  });
};
