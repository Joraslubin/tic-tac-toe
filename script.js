const pageCover = document.querySelector(".page-cover")
const form = document.querySelector("form")
const startBtn = document.querySelector(".start-game.btn")
const resetGameBtn = document.querySelector(".new-game.btn")
const gameboardContainer = document.querySelector(".board-container")
const cells = document.querySelectorAll(".cell")
const outcomeTextContainer = document.querySelector(".banner .title")


let gameboard = new Array(9).fill("")
let players = {}
let currentPlayer 
let gameStatus = "off"
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



const startGame = () => {

    form.classList.add("hidden")
    gameboardContainer.classList.remove("hidden")
    gameStatus = "on"
}

const resetGame = () => {
    gameboard = new Array(9).fill("")
    currentPlayer = "X"
    cells.forEach(cell => { cell.innerText = "" })
    pageCover.classList.add("hidden")
    gameStatus = "on"
}

const updateCell = (marker, cell, index) => {
    cell.innerText = marker;
    gameboard[index] = marker;
}

const checkWin = () => {

    const hasWinner = winConditions.some(array => 
        (array.every(item => gameboard[item] == "O") || array.every(item => gameboard[item] == "X")) ? true : false)

    const isTie = !hasWinner && gameboard.indexOf("") == -1

    const handleOutcome = (outcome) => {
        pageCover.classList.remove("hidden")
        outcomeTextContainer.innerText = outcome == "win" ? `${players[currentPlayer]} wins!` : "It's a tie"
        gameStatus = "off"
    }

    if(hasWinner){
        handleOutcome("win")
    }
    else if(isTie){
        handleOutcome("tie")
    }
    
}

const handleClick = (e) => {


    const clickedCell = e.target
    const cellIndex = clickedCell.dataset.index

    if (gameStatus == "on" && gameboard[cellIndex] == "") {

        updateCell(currentPlayer, clickedCell, cellIndex)
        checkWin()
        currentPlayer = currentPlayer == "X" ? "O" : "X"
    }

}

const handleSubmit = (e) => {

    e.preventDefault()

    const playerOne = document.querySelector("#player-one")
    const playerOneMarker = document.querySelector("#marker-player-one")
    const playerTwo = document.querySelector("#player-two")
    const playerTwoMarker = document.querySelector("#marker-player-two")

    if (playerOneMarker.value == playerTwoMarker.value) {
        alert("Your markers should not be identical")
    }

    currentPlayer = playerOneMarker.value

    players[playerOneMarker.value] = playerOne.value
    players[playerTwoMarker.value] = playerTwo.value

    startGame()

}



form.addEventListener("submit", e => { handleSubmit(e) })
cells.forEach(cell => {
    cell.addEventListener("click", handleClick)
})
resetGameBtn.addEventListener("click",resetGame)

