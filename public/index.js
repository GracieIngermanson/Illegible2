const clientSocket = io(window.location.origin);

// Called when a user selects the interactive highlight view for a given story url
const emitViewStoryHighlights = (url) => {
  clientSocket.emit('viewStoryHighlights', url);
};

const loadHighlights = (highlights) => {
  console.log(highlights);
  highlights.forEach((elementId) =>
    d3.select(`#${elementId}`).each(function () {
      this.classList.toggle('highlight');
    })
  );
};

// Called when a user clicks a word to highlight or unhighlight
const emitSendHighlight = (elementId) => {
  clientSocket.emit('sendHighlight', elementId);
};

clientSocket.on('loadHighlights', loadHighlights);

// Toggle highlight for a word which some viewer of the story has clicked
clientSocket.on('displayHighlight', (elementId) => {
  d3.select(`#${elementId}`).each(function () {
    this.classList.toggle('highlight');
  });
});
