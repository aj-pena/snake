const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const moveBtn = document.getElementById('move')
const score = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i=0; i < 100; i++) {
     //create element
    const square = document.createElement('div')
    //add styling to the element
    square.classList.add('square')
    //put the element into our grid
    grid.appendChild(square)
    //push it into a new squares array    
    squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {
    //remove last element from our currentSnake array. Pop() removes the last element of an array and returns it.
    let last = currentSnake.pop()
    
    squares[last].classList.remove('snake')
    
    currentSnake.unshift(currentSnake[0]+direction)
    
    currentSnake.forEach(function(item){squares[item].classList.add('snake')})
    
}
// Event listener for move button
moveBtn.addEventListener("click",move)

// Interval for moving the snake every second
let timerId = setInterval(move, 1000)

// clearInterval(timerId)