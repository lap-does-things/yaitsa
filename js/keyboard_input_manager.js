function KeyboardInputManager() {
  this.events = {};

  this.listen();
}

KeyboardInputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

KeyboardInputManager.prototype.listen = function () {
  var self = this;

  var map = {
    // TODO: добавить для тача !DONE!
    81: { x: 0, y: 1, type: 'button' }, // Top-Left
    69: { x: 1, y: 1, type: 'button' }, // Top-Right
    68: { x: 1, y: 0, type: 'button' }, // Bottom-Right
    65: { x: 0, y: 0, type: 'button' }, // Bottom-Left

    82: { key: 'restart', type: 'common' }  // Restart
  };
  document.addEventListener('click',function(e){
    console.log(e.clientX, e.clientY); // TODO : DELETEME
    if(e.clientX < 960 && e.clientY < 540) {
      self.emit('move', { x: 0, y: 1, type: 'button' });
    };
    if (e.clientX > 960 && e.clientY < 540) {
      self.emit('move', { x: 1, y: 1, type: 'button' });
    };
    if (e.clientX > 960 && e.clientY > 540) {
      self.emit('move', { x: 1, y: 0, type: 'button' });
    };
    if (e.clientX < 960 && e.clientY > 540) {
      self.emit('move', { x: 0, y: 0, type: 'button' });
    };
  });

  document.addEventListener('keydown', function (event) {
    var modifiers = event.altKey && event.ctrlKey && event.metaKey &&
                    event.shiftKey;
    var data    = map[event.which];

    if (!modifiers && data !== undefined) {
      event.preventDefault();
      self.emit('move', data);
    }

  });
};