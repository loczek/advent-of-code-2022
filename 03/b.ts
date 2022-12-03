import { getLines } from "../utils.ts";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

async function main() {
  const lines = await getLines(3);

  let res = 0;

  for (let i = 0; i < lines.length; i = i + 3) {
    let map: { [key: string]: number } = {};
    for (let j = i; j < i + 3; j++) {
      const line = lines[j];
      const set = new Set(line.split(""));

      for (const letter of set) {
        if (!map[letter]) {
          map[letter] = 0;
        }
        map[letter] += 1;
      }
    }

    for (const letter in map) {
      if (Object.prototype.hasOwnProperty.call(map, letter)) {
        const letterCount = map[letter];
        if (letterCount === 3) {
          res += alphabet.indexOf(letter) + 1;
          break;
        }
      }
    }
  }

  console.log(res);
}

main();
