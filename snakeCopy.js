
document.getElementById('roll-dice').addEventListener('click',function(e){
    e.preventDefault();
    const max = 6;
  const roll = Math.ceil(Math.random() * max);
  document.querySelector('.img-dice').style.display="block"
  document.querySelector('.img-dice').src="dice-"+roll+".png"
  console.log("You rolled", roll);

  let currentPlayer = players[currentPlayerTurn];
  currentPlayer.position += roll;
  ladders.forEach((ladder) => {
    if (ladder.start === currentPlayer.position) {
      console.log("You stepped on a ladder!");
      currentPlayer.position = ladder.end;
    }
  });

  if (currentPlayer.position === position) {
    console.log("Player has won!");
    hasWon = true;
  }
  
  if (currentPlayer.position === position) {
    const diff = currentPlayer.position - position;
    currentPlayerPosition = position - diff;
  }

  currentPlayerTurn++;
  if (currentPlayerTurn >= players.length) {
    currentPlayerTurn = 0;
  }
  renderBoard();
})


const players = [
    {
      name: "Cloud",
      position: 0,
      color: "gold",
    },
    {
      name: "Sephiroth",
      position: 0,
      color: "blue",
    },
  ];
  const ladders = [
    {
      start: 11,
      end: 22,
    },
    {
      start: 50,
      end: 34,
    },
    {
      start: 19,
      end: 54,
    },
    {
      start: 67,
      end: 24,
    },
    {
      start: 70,
      end: 95,
    },
    {
      start: 99,
      end: 27,
    },
  ];

  let currentPlayerTurn = 0;
  
  const width = 10;
  const height = 10;
  const board = [];
  let position = 0;
  let blackSquare = false;
  for (var y = height; y > 0; y--) {
    let row = [];
  
    board.push(row);
    for (var x = 0; x < width; x++) {
      row.push({
        x,
        y,
        occupied: null,
        position,
        color: blackSquare ? "steelblue" : "silver",
      });
      blackSquare = !blackSquare;
      position++;
    }
  }

  const boardSizeConst = 80;
  //render a board;
const renderBoard = () => {
  let boardHTML = ``;
  board.forEach((row) => {
    row.forEach((square) => {
      boardHTML += `<div class=square style="top:${
        square.y * boardSizeConst
      }px; left:${square.x * boardSizeConst}px; background-color:${
        square.color
      }">
      <div class="item">${square.position}</div>
       </div>`;
      
    });
    
  });
  players.forEach((player) => {
    let square = null;
    board.forEach((row) => {
      row.forEach((square) => {
        if (square.position === player.position) {
          boardHTML += `<div class=player style="top:${
            square.y * boardSizeConst + 5
          }px; left:${square.x * boardSizeConst + 5}px;background-color:${
            player.color
          }"></div>`;
        }
      });
    });
  });

  ladders.forEach((ladder) => {
    //let start = 0;
    let startPos = { x: 0, y: 0 };
    let endPos = { x: 0, y: 0 };

    board.forEach((row) => {
        // console.log(row);
      row.forEach((square) => {
        if (square.position === ladder.start) {
          startPos.x = square.x * boardSizeConst;
          startPos.y = square.y * boardSizeConst;
        }

        if (square.position === ladder.end) {
          endPos.x = square.x * boardSizeConst;
          endPos.y = square.y * boardSizeConst;
        }
      });
    });

    const isLadder = ladder.end > ladder.start;
    
    drawLine({ color: isLadder ? "green" : "red", startPos, endPos });

  });
  document.getElementById('board').innerHTML=boardHTML  
}

function drawLine({ color, startPos, endPos }) {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    // const sizeRatio = 1;
    // ctx.drawImage(base_image,startPos.x+66,endPos.y+23)
    ctx.moveTo(startPos.x + 35, startPos.y + 20);
    ctx.lineTo(endPos.x + 20, endPos.y + 25);
  
    ctx.lineWidth = 10;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  document.querySelector('.img-dice').style.display="none"
  renderBoard();
