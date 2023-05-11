
let player1 = '';
let player2 = '';
let players = { X: '', O: '' }
let attemps = 0;
let flagX = true;

let condicionales = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let winner = false;

let tablero = document.getElementsByClassName("board")

let validateFields = () => {
    player1 = document.getElementById('player1').value
    player2 = document.getElementById('player2').value

    if (player1.trim() === '' || player2.trim() === '') {
        Swal.fire({
            text: 'You have to enter both player names',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return false
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
        // Deshabilitar boton jugar
        document.getElementById("btn-play").classList.add("disabled")
    })
}

let startPlay = () => {
    if (validateFields()) {
        // Elegir el jugador con X
        choosePlayer();
        // Habilitar panel de juego
        document.getElementById('panel-game').classList.remove("disabled");

        document.getElementById('player-turn').innerHTML = `Player X turn`

    }
}


let checkBox = (element) => {
    let symbol = ''

    if (element.innerHTML == '') {
        (flagX) ? (symbol = "X") : (symbol = "O")
        element.innerHTML = symbol;
        (flagX) ? (symbol = "O") : (symbol = "X")
        document.getElementById('player-turn').innerHTML = `Player ${symbol} turn`
        flagX = !flagX;
        attemps++
    }

    if (attemps >= 3) checkWinner()

    if (attemps == 9 && !winner) {
        // showTie(); Empate
    }

}

let checkWinner = () => {

    // Recorrer las condicionales y verificar con el valor actual de la celda
    for (let i = 0; i < condicionales.length; i++) {
        // Obtener las posiciones necesarias
        let c1 = condicionales[i][0]
        let c2 = condicionales[i][1]
        let c3 = condicionales[i][2]

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
    document.getElementById('player1').value = ""
    document.getElementById('player2').value = ""
    document.getElementById('player1').focus()

    document.getElementById("btn-play").classList.remove("disabled") // Habilitar boton play
    document.getElementById('player-turn').innerHTML = "" //Quitar mensaje de turno
    
    // Deshabilitar panel de juego
    document.getElementById('panel-game').classList.add("disabled")
    // Resetear tablero
    
    for (const board of tablero) {
        board.innerHTML = ''
    }
    
    // Resetear variables
    flagX = true;
    attemps = 0;
    winner = false
}
