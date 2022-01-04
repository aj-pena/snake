const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const score = document.getElementById('score')
const squares = []
let currentSnake = [0,1,2]
// Function to draw the grid
function createGrid() {
   
    for (let i=0; i < 100; i++) {
    
    const square = document.createElement('div')
    console.log(square)
    
    square.classList.add('square')
    
    grid.appendChild(square)
       
    squares.push(square)
    }
    console.log(squares)
}
createGrid()
// Drawing the initial snake
currentSnake.forEach(function(item){squares[item].classList.add("snake")})
