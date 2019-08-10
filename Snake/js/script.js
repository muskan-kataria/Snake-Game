function init()
{
 
document.getElementById("outer").style.visibility = "visible";
   


    var canvas = document.getElementById('gamecanvas');
var context = canvas.getContext('2d');
var grid = 10;
var count = 0;
    var score=0;
  
var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],

  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};

       
     
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {

  requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }
  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  
 
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
 
  snake.cells.unshift({x: snake.x, y: snake.y});
 
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
 
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid, grid);
 
  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {
    
    
    context.fillRect(cell.x, cell.y, grid, grid);  
   
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
        score++;
        document.getElementById("score").innerHTML=score;
   
      apple.x = getRandomInt(0, 40) * grid;
      apple.y = getRandomInt(0, 40) * grid;
    }
   
    for (var i = index + 1; i < snake.cells.length; i++) {
      
      // snake occupies same space as a body part. reset game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
    
          setTimeout(function(){
              alert("game over");
          location.reload(true);
          },100);
      }
    }
  });
}

document.addEventListener('keydown', function(e) {
 
  
  // left arrow key
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
// start the game
requestAnimationFrame(loop);
    
}



    
