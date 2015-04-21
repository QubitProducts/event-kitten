/* global describe, it, beforeEach, expect */

var sinon = require('sinon')
var createEmitter = require('../event-kitten')

describe('emitter', function () {
  var emitter = createEmitter()
  beforeEach(function () {
    emitter = createEmitter()
  })
  it('should not throw errors when no observers are present', function () {
    expect(emitter.on).withArgs('foo').to.not.throwException()
  })
  it('should invoke the handler only when the named event is emitted', function () {
    var handler = sinon.stub()
    emitter.on('foo', handler)
    expect(handler.callCount).to.be(0)

    emitter.emit('bar')
    expect(handler.callCount).to.be(0)

    emitter.emit('foo')
    expect(handler.callCount).to.be(1)
  })
  it('should invoke more than one handler observing the same named event', function () {
    var handlerA = sinon.stub()
    var handlerB = sinon.stub()
    emitter.on('foo', handlerA)
    emitter.on('foo', handlerB)

    emitter.emit('foo')
    expect(handlerA.callCount).to.be(1)
    expect(handlerB.callCount).to.be(1)
  })
  it('should not invoke the observer when the dispose method is called', function () {
    var handlerA = sinon.stub()
    var handlerB = sinon.stub()
    var subscription = emitter.on('foo', handlerA)
    emitter.on('foo', handlerB)

    emitter.emit('foo')
    subscription.dispose()
    emitter.emit('foo')
    expect(handlerA.callCount).to.be(1)
    expect(handlerB.callCount).to.be(2)
  })
  it('should pass emitted data to the handler', function () {
    var dataA = {}
    var dataB = {}
    var handlerA = sinon.stub()
    var handlerB = sinon.stub()
    emitter.on('foo', handlerA)
    emitter.on('bar', handlerB)

    emitter.emit('foo', dataA)
    emitter.emit('bar', dataB)
    expect(handlerA.withArgs(dataA).callCount).to.be(1)
    expect(handlerB.withArgs(dataB).callCount).to.be(1)
  })
  it('should not throw errors if dispose is called twice', function () {
    var subscription = emitter.on('foo', sinon.stub())
    subscription.dispose()
    expect(subscription.dispose).to.not.throwException()
  })
})
