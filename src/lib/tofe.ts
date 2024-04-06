
type Matrix = number[][];
export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

class Tofe {
  #defaultMatrix: Matrix = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
  matrix: Matrix;
  score = 0;
  gameOver = false;
  isWin = false;

  constructor(matrix?: Matrix) {
    this.matrix = matrix ?? this.#defaultMatrix;
    this.score = 0;
    this.gameOver = false;
    this.isWin = false;
    this.random();
    this.random();
  }

  // 随机生成2或4
  random() {
    const empty = this.getEmpty();
    if (empty.length === 0) {
      return;
    }
    const index = Math.floor(Math.random() * empty.length);
    const value = Math.random() > 0.1 ? 2 : 4;
    const [row, col] = empty[index];
    this.matrix[row][col] = value;
  }

  // 获取空位置
  getEmpty() {
    const empty: number[][] = [];
    this.matrix.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col === 0) {
          empty.push([i, j]);
        }
      });
    });
    return empty;
  }

  // 移动
  move(direction: Direction, cb?: () => void) {

    if (this.gameOver) return;
    let moved = false;
    switch (direction) {
      case Direction.UP:
        moved = this.moveUp();
        break;
      case Direction.DOWN:
        moved = this.moveDown();
        break;
      case Direction.LEFT:
        moved = this.moveLeft();
        break;
      case Direction.RIGHT:
        moved = this.moveRight();
        break;
    }

    if (moved) {
      this.random();
      this.check()
      cb?.();
    }
  }


  // 向上移动
  moveUp() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
      let i = 0;

      while (i < 4) {
        if (this.matrix[i][j] === 0) {

          let k = i + 1;
          while (k < 4) {
            if (this.matrix[k][j] !== 0) {


              this.matrix[i][j] = this.matrix[k][j];
              this.matrix[k][j] = 0;
              moved = true;
              break;
            }
            k++;
          }
        }
        i++;
      }
      i = 0;
      while (i < 3) {
        if (this.matrix[i][j] === this.matrix[i + 1][j] && this.matrix[i][j] !== 0) {
          this.matrix[i][j] *= 2;
          this.score += this.matrix[i][j];
          this.matrix[i + 1][j] = 0;
          moved = true;
        }
        i++;
      }
      i = 0;
      while (i < 4) {
        if (this.matrix[i][j] === 0) {
          let k = i + 1;
          while (k < 4) {
            if (this.matrix[k][j] !== 0) {
              this.matrix[i][j] = this.matrix[k][j];
              this.matrix[k][j] = 0;
              moved = true;
              break;
            }
            k++;
          }
        }
        i++;
      }
    }
    return moved;
  }

  // 向下移动
  moveDown() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
      let i = 3;
      while (i >= 0) {
        if (this.matrix[i][j] === 0) {
          let k = i - 1;
          while (k >= 0) {
            if (this.matrix[k][j] !== 0) {
              this.matrix[i][j] = this.matrix[k][j];
              this.matrix[k][j] = 0;
              moved = true;
              break;
            }
            k--;
          }
        }
        i--;
      }
      i = 3;
      while (i > 0) {
        if (this.matrix[i][j] === this.matrix[i - 1][j] && this.matrix[i][j] !== 0) {
          this.matrix[i][j] *= 2;
          this.score += this.matrix[i][j];
          this.matrix[i - 1][j] = 0;
          moved = true;
        }
        i--;
      }
      i = 3;
      while (i >= 0) {
        if (this.matrix[i][j] === 0) {
          let k = i - 1;
          while (k >= 0) {
            if (this.matrix[k][j] !== 0) {
              this.matrix[i][j] = this.matrix[k][j];
              this.matrix[k][j] = 0;
              moved = true;
              break;
            }
            k--;
          }
        }
        i--;
      }
    }

    return moved;
  }

  // 向左移动
  moveLeft() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
      let j = 0;
      while (j < 4) {
        if (this.matrix[i][j] === 0) {
          let k = j + 1;
          while (k < 4) {
            // 如果不为0,将移动到左侧
            if (this.matrix[i][k] !== 0) {
              this.matrix[i][j] = this.matrix[i][k];
              this.matrix[i][k] = 0;
              moved = true;
              break;
            }
            k++;
          }
        }
        j++;
      }
      j = 0;
      while (j < 3) {
        // 如果相邻两个数相等，合并
        if (this.matrix[i][j] === this.matrix[i][j + 1] && this.matrix[i][j] !== 0) {
          this.matrix[i][j] *= 2;
          this.score += this.matrix[i][j];
          this.matrix[i][j + 1] = 0;
          moved = true;
        }
        j++;
      }
      j = 0;
      while (j < 4) {
        if (this.matrix[i][j] === 0) {
          let k = j + 1;
          while (k < 4) {
            if (this.matrix[i][k] !== 0) {
              this.matrix[i][j] = this.matrix[i][k];
              this.matrix[i][k] = 0;
              moved = true;
              break;
            }
            k++;
          }
        }
        j++;
      }
    }

    return moved;
  }

  // 向右移动
  moveRight() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
      let j = 3;
      while (j >= 0) {
        if (this.matrix[i][j] === 0) {
          let k = j - 1;
          while (k >= 0) {
            if (this.matrix[i][k] !== 0) {
              this.matrix[i][j] = this.matrix[i][k];
              this.matrix[i][k] = 0;
              moved = true;
              break;
            }
            k--;
          }
        }
        j--;
      }
      j = 3;
      while (j > 0) {
        if (this.matrix[i][j] === this.matrix[i][j - 1] && this.matrix[i][j] !== 0) {
          this.matrix[i][j] *= 2;
          this.score += this.matrix[i][j];
          this.matrix[i][j - 1] = 0;
          moved = true;
        }
        j--;
      }
      j = 3;
      while (j >= 0) {
        if (this.matrix[i][j] === 0) {
          let k = j - 1;
          while (k >= 0) {
            if (this.matrix[i][k] !== 0) {
              this.matrix[i][j] = this.matrix[i][k];
              this.matrix[i][k] = 0;
              moved = true;
              break;
            }
            k--;
          }
        }
        j--;
      }
    }

    return moved;
  }

  // 判断游戏是否结束
  check() {
    // if (this.getEmpty().length === 0) {
    //   this.gameOver = true;
    // }
    if (this.getEmpty().length > 0) return;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.matrix[i][j] === 2048) {
          this.isWin = true;
          this.gameOver = true;
        }
        if (i > 0 && this.matrix[i][j] === this.matrix[i - 1][j]) {
          return;
        }
        if (j > 0 && this.matrix[i][j] === this.matrix[i][j - 1]) {
          return;
        }
      }
    }
    this.gameOver = true;
  }
}

export { Tofe }