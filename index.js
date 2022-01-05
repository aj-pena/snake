const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreEl = document.getElementById('score')
let score = 0
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let width = 10
let appleIndex = 0
let intervalTime = 1000
let speed = 0.9  // will increase speed by decreasing the time it takes for each step
let timerId = 0

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

function startGame(){
    generateApples()
    // Interval for moving the snake every second
    timerId = setInterval(move, intervalTime)
}

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

    // Deal with snake head getting an apple
    if(squares[currentSnake[0]].classList.contains('apple')){
        // remove apple class
        squares[currentSnake[0]].classList.remove('apple')
        // add snake class to tail
        squares[last].classList.add('snake')
        // grow snake array
        currentSnake.push(last)
        // generate apple
        generateApples()
        // Increase the score
        score ++
        // Display the score
        scoreEl.textContent = score
        // Speed up the game
        clearInterval(timerId)
        intervalTime = intervalTime*speed
        timerId = setInterval(move, intervalTime)
    }
    
    currentSnake.forEach(function(item){squares[item].classList.add('snake')})
    
}

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



function generateApples(){
    do{
        appleIndex = Math.floor(Math.random()*squares.length+1)
    }
    while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

document.addEventListener("keydown", control)
startButton.addEventListener('click', startGame)