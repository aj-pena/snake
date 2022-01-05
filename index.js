const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const moveBtn = document.getElementById('move')
const score = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let width = 10
let appleIndex = 0

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
    // Check if snake has gone against a wall
    if (
        (currentSnake[0] + width >= 100 && direction === 10) || //if snake has hit bottom
        (currentSnake[0] % width === 9 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -10) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    ){
    return clearInterval(timerId)
    }
    //remove last element from our currentSnake array. Pop() removes the last element of an array and returns it.
    let last = currentSnake.pop()
    
    squares[last].classList.remove('snake')
    
    currentSnake.unshift(currentSnake[0]+direction)
    
    currentSnake.forEach(function(item){squares[item].classList.add('snake')})
    
}
// Event listener for move button
moveBtn.addEventListener("click", move)

// Interval for moving the snake every second
let timerId = setInterval(move, 1000)


function control(e){
    switch (e.key){
        case "Down":
            direction = width;
        case "ArrowDown":
            direction = width;
            break;
        case "Up":
            direction = -width;
        case "ArrowUp":
            direction = -width;
            break;
        case "Right":
            direction = 1;
        case "ArrowRight":
            direction = 1;
            break;
        case "Left":
            direction = -1;
        case "ArrowLeft":
            direction = -1;
            break;
        default:
            return;
    }
}

document.addEventListener("keydown", control)

function generateApples(){
    do{
        appleIndex = Math.floor(Math.random()*101)
    }
    while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
generateApples()