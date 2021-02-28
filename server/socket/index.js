const storyRooms = {};
const storyHighlights = {};

const viewStoryHighlights = (serverIO, socket, url) => {
  // Unsubscribe to highlight updates for any story we were previously viewing
  if (storyRooms[socket.id]) {
    socket.leave(storyRooms[socket.id]);
  }
  // Subscribe to highlight updates for the story we are viewing
  socket.join(url);
  storyRooms[socket.id] = url;
  if (!storyHighlights[url]) {
    // First user to view the story
    // Add an object to store ids of highlighted paragraphs
    storyHighlights[url] = {};
  } else {
    const highlights = Object.keys(storyHighlights[url]);
    serverIO.to(socket.id).emit('loadHighlights', highlights);
  }
};

const sendHighlight = (serverIO, socket, elementId) => {
  const room = storyRooms[socket.id];
  const highlights = storyHighlights[room];
  // Toggle whether the given word is highlighted
  if (!highlights[elementId]) {
    highlights[elementId] = true;
  } else {
    delete highlights[elementId];
  }
  serverIO.in(room).emit('displayHighlight', elementId);
};

module.exports = (serverIO) => {
  serverIO.on('connection', (socket) => {
    // Add socket to the room for a particular story url
    socket.on('viewStoryHighlights', (url) =>
      viewStoryHighlights(serverIO, socket, url)
    );
    socket.on('sendHighlight', (elementId) =>
      sendHighlight(serverIO, socket, elementId)
    );
  });
};
