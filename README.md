Event Kitten
------------

An event emitter inspired by [event-kit](https://github.com/atom/event-kit), written in JavaScript. Meow.

### Motivation

[event-kit](https://github.com/atom/event-kit) is pretty awesome however it is written in coffeescript :disappointed: and uses [Grim](https://github.com/atom/grim) which is a >1MB dependency!


### API

```javascript
var createEmitter = require('event-kitten')
var emitter = createEmitter()

var sub = emitter.on('foo', function () {
  console.log('bar')
})

// logs 'bar'
emitter.emit('foo')

// remove the observer
sub.dispose()
```
