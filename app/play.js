// import './css3.js';
import * as THREE from 'three';
// import './css3.js';
import PlayJson from './play-json';
import PlaymaterialJs from './play-material';
import {TweenMax, TweenLite, Expo} from "gsap";
import mustache from 'mustache';
import {Mediator} from './mediator';
import {TextGlitch} from './text-glitch';
var emitter = Mediator.instance.emitter;

const templateHtml = "<div class='play'><div class='play-ico'></div><p> PLAY</p></div>";

export class Play extends THREE.Mesh {
  constructor(opts) {
    var geomloader = new THREE.BufferGeometryLoader;
    var geom = geomloader.parse(PlayJson);
    var materialJs = new PlaymaterialJs({
      color: "#4200ff",
      transparent: true,
      side: 2
    });
    var geometry = new THREE.BoxGeometry( 10, 10, 10 );
    var material = new THREE.MeshBasicMaterial( {color: 0x999999} );
    super(geom, material);
    this.enter = false;
    this.currentScale = .5;
    this.scale.set(.5, .5, .5);
    this.frustumCulled = false;
    // this.initCSS();
    this.onClickEvent = this.onClick.bind(this);
    this.enterEvent = this.onMouseEnter.bind(this);
    this.leaveEvent = this.onMouseLeave.bind(this)
  }

  initCSS() {
    var div = document.createElement('div');
    div.className = 'playbutton hide';
    this.render(div, templateHtml, {});
    this.cssButton = new THREE.CSS3DObject(div);
    this.playGlitch = new TextGlitch(this.cssButton.element.querySelector('p'));
    this.add(this.cssButton)
  }

  render(el, template, opts) {
    var output = mustache.render(template, opts);
    el.innerHTML = output
  }

  show() {
    this.enter = false;
    this.material.wireframe = false;
    // this.cssButton.element.classList.remove("hide");
    // this.playGlitch.start(.03);
    // this.addCssButtonEvents()
  }

  showdiff() {
    var _this = this;
    TweenLite.to([this.material.uniforms.diff], .9, {
      delay: .4,
      value: 1,
      ease: Expo.easeOut
    });
    TweenLite.delayedCall(.6, function() {
      _this.cssButton.element.classList.remove("hide");
      _this.playGlitch.start(.03)
    });
    this.enter = false;
    this.material.wireframe = false;
    // this.addCssButtonEvents()
  }

  hide() {
    this.enter = false;
    this.material.wireframe = false;
    this.cssButton.element.classList.add("hide");
    TweenLite.to(this.material.uniforms.diff, 1.1, {
      value: 0,
      ease: Expo.easeOut
    });
    this.playGlitch.start(.03);
    this.removeCssButtonEvent()
  }

  onClick(e) {
    emitter.emit('beep');
    this.removeCssButtonEvent();
    emitter.emit('xp:start');
    this.hide()
  }

  addCssButtonEvents() {
    this.removeCssButtonEvent();
    this.cssButton.element.addEventListener("click", this.onClickEvent);
    this.cssButton.element.addEventListener("mouseenter", this.enterEvent);
    this.cssButton.element.addEventListener("mouseleave", this.leaveEvent)
  }

  removeCssButtonEvent() {
    this.cssButton.element.removeEventListener("click", this.onClickEvent);
    this.cssButton.element.removeEventListener("mouseenter", this.enterEvent);
    this.cssButton.element.removeEventListener("mouseleave", this.leaveEvent)
  }

  onMouseLeave() {
    var _this2 = this;
    this.cssButton.element.classList.remove("enter");
    this.enter = false;
    this.material.wireframe = false;
    TweenMax.killTweensOf(this.scaleTween);
    this.scaleTween = new TweenMax.to(this, .1, {
      currentScale: .5,
      ease: Expo.EaseOut,
      onUpdate: function onUpdate() {
        _this2.scale.set(_this2.currentScale, _this2.currentScale, _this2.currentScale)
      }
    })
  }

  onMouseEnter(e) {
    console.log('mouse enter');
    var _this3 = this;
    this.cssButton.element.classList.add("enter");
    TweenMax.killTweensOf(this.scaleTween);
    this.scaleTween = new TweenMax.to(this, .08, {
      currentScale: .54,
      ease: Expo.EaseOut,
      onUpdate: function onUpdate() {
        _this3.scale.set(_this3.currentScale, _this3.currentScale, _this3.currentScale)
      }
    });
    this.enter = true;
    this.playGlitch.start(.03);
    this.material.wireframe = true;
    this.glitchWire()
  }

  glitchWire() {
    var _this4 = this;
    if (!this.enter) {
      this.material.wireframe = false
    } else {
      TweenMax.delayedCall(Math.random() * .04, function() {
        _this4.material.wireframe = Math.round(Math.random()) == 1 ? true : false;
        _this4.glitchWire()
      })
    }
  }
}
