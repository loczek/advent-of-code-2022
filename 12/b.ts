import { getLines } from "../utils.ts";

const alphabet: { [key: string]: number } = {
  S: 1,
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  E: 26,
};

async function main() {
  const lines = await getLines(12);

  let grid: string[][] = [];

  for (const line of lines) {
    grid.push(line.split(""));
  }

  let rows = grid.length;
  let cols = grid[0].length;

  const visited = new Set();
  let res = 0;
  let stack: [number, number, number][] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (alphabet[grid[r][c]] === 1) {
        stack.push([r, c, alphabet[grid[r][c]]]);
      }
    }
  }

  let tempStack: [number, number, number][] = [];
  function bfs(row: number, col: number, prev: number) {
    // out of bound
    if (row < 0 || col < 0 || row >= rows || col >= cols) return;
    // visited
    if (visited.has(row + ":" + col)) return;
    // return if +1 more than prev
    if (alphabet[grid[row][col]] > prev + 1) return;

    visited.add(row + ":" + col);

    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (const [r, c] of directions) {
      let newRow = row + r;
      let newCol = col + c;
      if (!visited.has(newRow + ":" + newCol)) {
        tempStack.push([newRow, newCol, alphabet[grid[row][col]]]);
      }
    }

    if (grid[row][col] === "E") {
      return res;
    }
  }

  while (true) {
    while (stack && stack.length > 0) {
      const [row, col, prev] = stack.pop()!;
      if (bfs(row, col, prev) !== undefined) {
        return res;
      }
    }
    res += 1;
    stack = tempStack;
    tempStack = [];
  }
}

console.log(await main());
