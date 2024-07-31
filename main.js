const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
let gameState = true


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
    let [x, y] = this.findIndex('*')
    const x2 = x
    const y2 = y
    //Adjust Coordinates
    switch (move) {
        case 'u':
            x -= 1
            break;
        case 'd':
            x += 1
            break;
        case 'l':
            y -= 1
            break;
        case 'r':
            y += 1
            break;
        default:
            return "Invalid Move"
    }
    // Check for "Out of Bounds"
    if (x < 0 || x >= this._field.length || y < 0 || y >= this._field[x2].length) {
        console.log("Out of Bounds")
        return 0
    }

    // Move the Character
    if (this._field[x][y] === hole) {
        return 0
    } else if (this._field[x][y] === hat) {
        return 1
    }
    this._field[x2][y2] = fieldCharacter
    this._field[x][y] = pathCharacter
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
  static generateField(height, width){
    const field = []
    for (let i = 0; i < height; i++){
        const row = []
        for(let j = 0; j < width; j++){
            const randomValue = Math.random() < 0.8 ? fieldCharacter : hole
            row.push(randomValue)
        }
        field.push(row)
    }
    let y = Math.floor(Math.random() * height)
    let x = Math.floor(Math.random() * width)
    field[x][y] = pathCharacter
    y = Math.floor(Math.random() * height)
    x = Math.floor(Math.random() * width)
    field[x][y] = hat

    return field
  }

  // Add Validation Checker for randomized Field
}

const myField = new Field([
    ["*", "░", "O"],
    ["░", "O", "░"],
    ["░", "^", "░"],
  ]);

const startHeight = prompt("Enter Height: ")
const startWidth = prompt("Enter Width: ")
const myField2Gen = Field.generateField(startHeight, startWidth)
const myField2 = new Field(myField2Gen)

while (gameState){
    myField2.print();
    const input = prompt("Make your move (u, d, l, r, exit): ")
    if (input === 'exit'){
        gameState = false
        break;
    }else if (['u', 'd', 'l', 'r'].includes(input)){
        const move = myField2.makeMove(input)
        if (move === 0){
            console.log("You Lost!")
            gameState = false
        } else if (move === 1) {
            console.log("You Won!")
            gameState = false
        }
    }else{
        console.log('Invalid Input')
    }
}

// Add better Graphical interface with terminal

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