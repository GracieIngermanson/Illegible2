const clientSocket = io(window.location.origin);

const emitSendHighlight = (elementId) => {
  console.log('Inside send highlight, element id', elementId);
  clientSocket.emit('sendHighlight', elementId);
};

clientSocket.on('displayHighlight', (elementId) => {
  console.log('inside display highlight, element id', elementId);
  d3.select(`#${elementId}`).each(function () {
    console.log('Inside display highlight callback');
    this.classList.toggle('highlight');
  });
});
