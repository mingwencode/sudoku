import '../App.css';
import {useState, useEffect} from 'react';

function Board() {

  const initialBoard = [
    [ 3, 1, 6, 5, 7, 8, 4, 9, 2 ],
    [ 5, 2, 9, 1, 3, 4, 7, 6, 8 ],
    [ 4, 8, 7, 6, 2, 9, 5, 3, 1 ],
    [ 2, 6, 3, 0, 1, 5, 9, 8, 7 ],
    [ 9, 7, 4, 8, 6, 0, 1, 2, 5 ],
    [ 8, 5, 1, 7, 9, 2, 6, 4, 3 ],
    [ 1, 3, 8, 0, 4, 7, 2, 0, 6 ],
    [ 6, 9, 2, 3, 5, 1, 8, 7, 4 ],
    [ 7, 4, 5, 0, 8, 6, 3, 1, 0 ]
  ];

  const [board, setBoard] = useState(initialBoard)
  const [rowSet, setRowSet] = useState(new Set())
  const [colSet, setColSet] = useState(new Set())
  const [squareSet, setSquareSet] = useState(new Set())
  const [isDuplicate, setIsDuplicate] = useState({row: null, col: null, duplicate: false});


  const handleCellChange = (value, row, col) => {
    const newBoard = [...board];
    newBoard[row][col] = Number(value) || 0;
    setBoard(newBoard)
    checkDuplicate(newBoard, row, col);

  }

  const checkDuplicate = (grid, row, col) => {
    let cell = grid[row][col];

     if(cell=== 0) {
      setIsDuplicate({row, col, duplicate:false})
      return;
    }

    if(rowSet.get(row)?.has(cell) || colSet.get(col)?.has(cell) || squareSet.get( Math.floor(row / 3) * 3 + Math.floor(col / 3))?.has(cell)) {
      setIsDuplicate({row, col, duplicate:true})
    }
 }

 useEffect(()=> {
  let rows = new Map();
  let cols = new Map();
  let square = new Map();

  for(let r = 0; r < board.length; r++) {
    for(let c = 0; c < board[r].length; c++) {
      let cell = board[r][c];
      if(cell !== 0) {
        //row
        if (!rows.has(r)) {
          rows.set(r, new Set());
        }
        rows.get(r).add(cell);
        //col
        if (!cols.has(c)) {
          cols.set(c, new Set());
        }
        cols.get(c).add(cell);
        //square
        let squareNumber = Math.floor(r / 3) * 3 + Math.floor(c / 3)
        if (!square.has(squareNumber)){
          square.set(squareNumber, new Set());
        }
        square.get(squareNumber).add(cell);
      }
    }

  }
setColSet(cols);
setRowSet(rows)
setSquareSet(square)

 },[board])

  return (
    <div className="board">

      {board.map((rows, rowIdx) => (
        <div key={rowIdx} className = "rows">
          {rows.map((col, colIdx) => (
              <input
              type="text"
              maxLength = "1"
              key={colIdx}
              className= {
                `cell
                ${isDuplicate.duplicate && isDuplicate.row === rowIdx && isDuplicate.col === colIdx ? ' duplicate' : ''}
                 ${[0,2,4,6,8].indexOf(Math.floor(rowIdx / 3) * 3 + Math.floor(colIdx/ 3)) !== -1 ? ' square' : ''}
                `}
              value={col=== 0 ? '' : col}
              onChange={(e)=>handleCellChange(e.target.value, rowIdx, colIdx)}
              disabled={(isDuplicate.duplicate && !(isDuplicate.row === rowIdx && isDuplicate.col === colIdx))||initialBoard[rowIdx][colIdx]!==0}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export default Board;