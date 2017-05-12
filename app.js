// app.js
var canvas, ctx;
var mx, my;
var stars = [];
var selectedStars = [];
var MAX_ANGLE = 2 * Math.PI;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;  
}

function onClickCanvas(e) {
  var x = e.clientX;
  var y = e.clientY;

  // check if the click is on a star
  var foundIdx = -1;
  stars.forEach(function(star, idx) {
    var xDiff = star.x - x;
    var yDiff = star.y - y;
    var dist = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
    if (dist < 10) {

    }
  });
}

function onMouseMoveCanvas(e) {
  mx = e.clientX;
  my = e.clientY;
}

function init() {
  // Get the canvas and context
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  // Resize the canvas, and set an event handler for future window resizes
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, true);

  // Add canvas event listeners 
  canvas.addEventListener('click', onClickCanvas, true);
  canvas.addEventListener('mousemove', onMouseMoveCanvas, true);
  mx = canvas.width / 2;
  my = canvas.height / 2;
}

function draw(tick) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // stars
  var starRadius = 20;
  stars.forEach(function(star) {
    // use pythagorean theorm to calculate the length of the line between the star and the mouse
    var hasHalo = Math.sqrt(((mx - star.x)*(mx - star.x)) + ((my - star.y)*(my - star.y))) < starRadius + 10;
    if (hasHalo) {
      // halo - white
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.filter = 'blur(25px)';
      ctx.arc(star.x, star.y, starRadius + 5, 0, MAX_ANGLE, true)
      ctx.fill();
      
      // halo - black
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.filter = 'blur(0px)';
      ctx.arc(star.x, star.y, starRadius + 10, 0, MAX_ANGLE, true)
      ctx.fill();
    }
    
    // yellow center
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.arc(star.x, star.y, starRadius, 0, MAX_ANGLE, true)
    ctx.fill();
  });

  // cursor
  var cursorRadius = 10;
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(mx, my, cursorRadius, 0, MAX_ANGLE, true);
  ctx.stroke();
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(mx, my, cursorRadius, 0, MAX_ANGLE, true);
  ctx.stroke();
}

function loop(tick) {
  draw(tick);
  requestAnimationFrame(loop);
}

var NUM_STARS = 10;
function createStars() {
  // pick random x and y coordinates for NUM_STARS
  stars = [];
  var padding = 100;
  var halfPadding = padding / 2;
  for (var i = 0; i < NUM_STARS; i++) {
    // TODO: make sure there are no overlapping
    stars.push({
      x: ~~(Math.random() * (canvas.width - padding)) + halfPadding,
      y: ~~(Math.random() * (canvas.height - padding)) + halfPadding,
    });
  }
}

(function() {
  init();
  createStars();
  requestAnimationFrame(loop);
})();