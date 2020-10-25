// Define animations
const dontFlySpirit = require('./pages/dontFlySpirit.js');
const life = require('./pages/life.js');
const microphone = require('./pages/microphone.js');
const particles = require('./pages/particles.js');
const pong = require('./pages/pong.js');
const sprites = require('./pages/sprites.js');
const triangles = require('./pages/triangles.js');

// Create an array of all of the animations
const pages = [dontFlySpirit, life, microphone, particles, pong, sprites, triangles];

// Select and run a random animation
var index = Math.floor(Math.random()*pages.length); 
pages[index].execute();