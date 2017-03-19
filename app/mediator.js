var singleton = Symbol();
var _eventEmitter = require("event-emitter");
var singletonEnforcer = Symbol();
var config = undefined;
import {TweenMax, TweenLite} from "gsap";

export class Mediator {
  constructor(enforcer) {
    if (enforcer != singletonEnforcer) {
      throw "Cannot construct mediator singleton"
    }
    this.timeoutresize = null;
    this.currentSlide = 0;
    this.emitter = (0, _eventEmitter)({});
    this.mouseDate = Date.now();
    this.isMouseActive = false
  }

  setConfig(conf) {
    config = conf;
    this.addEvents()
  }

  update() {
    this.emitter.emit("update");
    var date = Date.now();
    if (date - this.mouseDate > 7e3 && date - this.mouseDate < 8e3) {
      this.mouseDate = 0;
      this.isMouseActive = false;
      this.emitter.emit("mouse:nonactive")
    }
  }

  addEvents() {
    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
    window.addEventListener("click", this.onClick.bind(this));
    window.addEventListener("blur", this.onBlur.bind(this));
    window.addEventListener("focus", this.onFocus.bind(this));
    TweenLite.ticker.addEventListener("tick", this.update.bind(this))
  }

  onKeyDown(e) {
    this.emitter.emit("keyboard", String.fromCharCode(e.keyCode));
    this.emitter.emit("randomkey")
  }

  onBlur() {
    this.emitter.emit("blur")
  }

  onFocus() {
    this.emitter.emit("focus")
  }

  onKeyUp() {
    this.emitter.emit("keyboardup")
  }

  onClick() {
    this.resetMouseActive()
  }

  resetMouseActive() {
    if (!this.isMouseActive) {
      this.emitter.emit("mouse:active")
    }
    this.isMouseActive = true;
    this.mouseDate = Date.now()
  }

  onMouseMove(e) {
    this.resetMouseActive();
    this.isMouseActive = true;
    var fullRatioX = (e.clientX / this.w * 2 - 1) / 2;
    var fullRatioY = (e.clientY / this.h * 2 - 1) / 2;
    this.emitter.emit("mousemove", {
      x: e.clientX,
      y: e.clientY,
      xRatio: fullRatioX,
      yRatio: fullRatioY
    });
    this.mouseDate = Date.now()
  }

  onResize(e) {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.emitter.emit("resize", this.w, this.h)
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Mediator(singletonEnforcer)
    }
    return this[singleton]
  }
}
