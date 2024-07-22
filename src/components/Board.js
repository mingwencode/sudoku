import '../App.css';
import {useState, useEffect} from 'react';

function Board() {

  const initialBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  const [board, setBoard] = useState(initialBoard)
  const [rowSet, setRowSet] = useState(new Set())
  const [colSet, setColSet] = useState(new Set())
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

    if(rowSet.get(row)?.has(cell) || colSet.get(col)?.has(cell)) {
      setIsDuplicate({row, col, duplicate:true})
    }
 }

 useEffect(()=> {
  let rows = new Map();
  let cols = new Map();

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
      }
    }

  }
setColSet(cols);
setRowSet(rows)

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
              className= {`cell${isDuplicate.duplicate && isDuplicate.row === rowIdx && isDuplicate.col === colIdx ? ' duplicate' : ''}`}
              value={col=== 0 ? '' : col}
              onChange={(e)=>handleCellChange(e.target.value, rowIdx, colIdx)}
              disabled={isDuplicate.duplicate && !(isDuplicate.row === rowIdx && isDuplicate.col === colIdx)}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export default Board;