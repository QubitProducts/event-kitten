module.exports = createEmitter

function createEmitter () {
  var handlersByName = {}

  return {
    on: on,
    emit: emit
  }

  function on (eventName, handler) {
    handlersByName[eventName] =
      handlersByName[eventName] || []
    handlersByName[eventName].push(handler)

    return {
      dispose: dispose
    }

    function dispose () {
      handlersByName[eventName] =
        filter(handlersByName[eventName], function (h) {
          return handler === h
        })
    }
  }

  function emit (eventName, eventData) {
    callEach(handlersByName[eventName] || [], eventData)
  }

  function filter (list, test) {
    var output = []
    each(list, function (item) {
      if (!test(item)) {
        output.push(item)
      }
    })
    return output
  }

  function callEach (fnList, data) {
    each(fnList, function (fn) {
      fn(data)
    })
  }

  function each (list, iterator) {
    for (var i = 0; i < list.length; i++) {
      iterator(list[i])
    }
  }
}
