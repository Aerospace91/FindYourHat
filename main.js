const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
let gameState = false


class Field {
  constructor(field) {
    this._field = field;
  }

  print() {
    let newStr = "";
    for (let line of this._field) {
      newStr += line.join("");
      newStr += "\n";
    }
    console.log(newStr);
  }
  makeMove(move){
    return this.findIndex('*')
  }
  findIndex(char){
    for (let i = 0; i < this._field.length; i++){
        for (let j = 0; j < this._field[i].length; j++){
            if (this._field[i][j] === char) {
                return [i, j]
            }
        }
    }
  }
}

const myField = new Field([
    ["*", "░", "O"],
    ["░", "O", "░"],
    ["░", "^", "░"],
  ]);

while (!gameState){
    myField.print();
    const input = prompt("Make your move (u, d, l, r, exit): ")
    if (input === 'exit'){
        gameState = true
    }else if (['u', 'd', 'l', 'r'].includes(input)){
        console.log(myField.makeMove(input))
    }else{
        console.log('Invalid Input')
    }
}

/* 3x3  
[
   0 [0, 1, 2],
   1 [0, 1, 2],
   2 [0, 1, 2]]
u = [1, 1] -> [0, 1] = -1, 0
d = [1, 1] -> [2, 1] = +1, 0
l = [1, 1] -> [1, 0] = 0, -1
r = [1, 1] -> [2, 0] = 0, +1

*/