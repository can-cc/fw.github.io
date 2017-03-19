import * as THREE from 'three';
import {TweenMax, TweenLite} from "gsap";
import {Mediator} from './mediator';
var emitter = Mediator.instance.emitter;

export class TextGlitch {
  constructor(element) {
    this.element = element;
    this.originalText = element.innerHTML;
    this.originalLength = this.originalText.length;
    this.countBack = this.originalLength;
    this.countLimit = this.originalLength;
    this.renderEvent = this.render.bind(this);
    this.element.innerHTML = "";
  }

  setNewText(text) {
    this.element.innerHTML = text;
    this.originalText = text;
    this.originalLength = this.originalText.length;
    this.countBack = this.originalLength;
    this.countLimit = this.originalLength
  }

  setNewText(text) {
    this.element.innerHTML = text;
    this.originalText = text;
    this.originalLength = this.originalText.length;
    this.countBack = this.originalLength;
    this.countLimit = this.originalLength
  }

  start(speed) {
    this.speed = speed || .025;
    this.count = 0;
    if (this.timer) {
      this.timer.kill()
    }
    this.timer = TweenLite.delayedCall(this.speed, this.renderEvent)
  }

  render() {
    var progress = this.countLimit - this.count;
    if (progress <= this.originalLength) {
      var slice = this.originalLength - progress;
      var str = this.originalText.slice(0, slice);
      str += this.randomString().slice(0, progress);
      this.element.innerHTML = str
    } else if (this.count + 2 < this.originalLength) {
      var _length = Math.min(this.count + 2, 9);
      this.element.innerHTML = this.randomString().slice(0, _length)
    } else {
      this.element.innerHTML = this.randomString().slice(0, 9)
    }
    if (this.count < this.countLimit) {
      this.count++;
      this.timer = TweenLite.delayedCall(this.speed, this.renderEvent)
    } else {
      this.element.innerHTML = this.originalText
    }
  }

  reverse() {}

  setRandom(nb) {
    this.element.innerHTML = Math.random().toString(36).slice(2, nb).toUpperCase()
  }

  remove() {
    emitter.off("update", this.updateEvent)
  }

  addEvents() {
    emitter.on("update", this.updateEvent = this.update.bind(this))
  }

  andomString() {
    var str = undefined;
    if (this.originalLength > 18) {
      str = Math.random().toString(36).slice(2, 18).toUpperCase();
      str += Math.random().toString(36).slice(2, this.originalLength - 18).toUpperCase()
    } else {
      str = Math.random().toString(36).slice(2, this.originalLength).toUpperCase()
    }
    return str
  }
}
