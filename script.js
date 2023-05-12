
let player1 = null;
let player2 = null;
let players = { X: '', O: '' }
let attemps = 0;
let flagX = true;
let conditions_of_win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let winner = false;
let isSoloPlayer = false;

let tablero = document.getElementsByClassName("board")
let inputs = document.getElementsByClassName("input-group")
let playButtons = document.getElementById("btn-container")
let chooseButtons = document.getElementById("choose-game")

// Inicialmente no mostrar la carga de nombres ni los botones de jugar
for (const input of inputs) {
    input.style.display = 'none'
}

playButtons.style.display = 'none'


let chooseGame = (players) => {
    // Ocultar los botones de eleccion de juego
    chooseButtons.style.display = "none"
    playButtons.style.display = 'flex'

    if (players == 1) {
        // Mostrar solo el primer input
        inputs[0].style.display = 'block'
        isSoloPlayer = true;
    } else {
        // Mostrar todos
        for (const input of inputs) {
            input.style.display = 'block'
        }
    }
}


let validateFields = () => {
    player1 = document.getElementById('player1').value
    player2 = (isSoloPlayer) ? "Computer" : document.getElementById('player2').value

    if (isSoloPlayer) {
        if (player1.trim() === '') {
            Swal.fire({
                text: 'You have to enter the player name',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return false
        }
    } else {
        if (player1.trim() === '' || player2.trim() === '') {
            Swal.fire({
                text: 'You have to enter both player names',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return false
        }
    }

    return true
}

let choosePlayer = () => {

    Swal.fire({
        text: 'Which player will have the "X" ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: player1,
        cancelButtonText: player2,
        confirmButtonColor: '#ff1493',
        cancelButtonColor: '#147eff',
        allowOutsideClick: false
    }).then((result) => {
        // Player 1
        if (result.isConfirmed) {
            players.X = player1;
            players.O = player2;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Player 2
            players.X = player2;
            players.O = player1;
        }
        play();
    })
}

let startPlay = () => {
    if (validateFields()) {
        // Elegir el jugador con X
        choosePlayer();
    }
}

let play = () => {
    // Deshabilitar boton jugar
    document.getElementById("btn-play").classList.add("disabled")
    // Habilitar panel de juego
    document.getElementById('panel-game').classList.remove("disabled");

    document.getElementById('player-turn').innerHTML = `Player X turn`

    // Si es solo player y el que tiene la x es la computadora es la que empieza
    if (isSoloPlayer && players.X == "Computer" && flagX == true) {
        console.log("empiexa la compu")
        playAi()
    }

}


let checkBox = (element) => {
    let symbol = ''

    if (element.innerHTML == '') {
        // Colocar la marca
        (flagX) ? (symbol = "X") : (symbol = "O")
        element.innerHTML = symbol;
        // Deshabilitar hacer click en la celda
        // element.classList.add(" marked")
        // Colocar el mensaje del siguiente turno
        (flagX) ? (symbol = "O") : (symbol = "X")
        document.getElementById('player-turn').innerHTML = `Player ${symbol} turn`
        // Modificar el turno
        flagX = !flagX;
        attemps++
    }

    if (attemps >= 3) checkWinner()

    if (attemps == 9 && !winner) {
        showTie();
    }

    // Si es solo player juega la ai
    if (isSoloPlayer && players.X == "Computer" && flagX) {
        setTimeout(function () {
            playAi()
        }, 200);
    } else if (isSoloPlayer && players.O == "Computer" && !flagX) {
        setTimeout(function () {
            playAi()
        }, 200);
    }
}



let checkWinner = () => {

    // Recorrer las conditions_of_win y verificar con el valor actual de la celda
    for (let i = 0; i < conditions_of_win.length; i++) {
        // Obtener las posiciones necesarias
        let c1 = conditions_of_win[i][0]
        let c2 = conditions_of_win[i][1]
        let c3 = conditions_of_win[i][2]

        if (tablero[c1].innerHTML == 'X' && tablero[c2].innerHTML == 'X' && tablero[c3].innerHTML == 'X') {
            console.log('X gana')
            showWinner(players.X)
            winner = true;
            break
        } else if (tablero[c1].innerHTML == 'O' && tablero[c2].innerHTML == 'O' && tablero[c3].innerHTML == 'O') {
            console.log('O gana')
            showWinner(players.O)
            winner = true;
            break
        }
    }
}

let showModalWithImage = (title, subtitle, img) => {
    Swal.fire({
        title: title,
        text: subtitle,
        width: 500,
        padding: '3em',
        backdrop: `
          rgba(0,0,123,0.4)
          url(${img})
          left top
          no-repeat
        `,
        confirmButtonText: 'Play again!',
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            resetGame()
        }
    })
}

let showWinner = (name) => {
    showModalWithImage(`Congrats!! ${name}`, "You win the game", "https://sweetalert2.github.io/images/nyan-cat.gif")
}

let showTie = () => {
    showModalWithImage(`Ohh!!`, "It's a tie :(", "https://i.pinimg.com/originals/fb/ed/b2/fbedb25b550829b8b4c4984b45992b39.gif")
}

let resetGame = () => {
    // Resetear inputs
    // document.getElementById('player1').value = ""
    // document.getElementById('player2').value = ""
    // document.getElementById('player1').focus()

    // document.getElementById("btn-play").classList.remove("disabled") // Habilitar boton play
    // document.getElementById('player-turn').innerHTML = "" //Quitar mensaje de turno

    // // Deshabilitar panel de juego
    // document.getElementById('panel-game').classList.add("disabled")
    // // Resetear tablero
    // for (const board of tablero) {
    //     board.innerHTML = ''
    // }

    // // Resetear variables
    // flagX = true;
    // attemps = 0;
    // winner = false
    window.location.reload();
}

let playAi = () => {
    // Obtain every spot free
    let freeSpots = []
    for (const board of tablero) {
        if (board.innerHTML == '') {
            freeSpots.push(board.id);
            // checkBox(board);

        }
    }
    // Select random spot
    let randomSpot = freeSpots[randomInteger(0, freeSpots.length - 1)];
    // Mark the board
    checkBox(tablero[randomSpot]);
}

const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;