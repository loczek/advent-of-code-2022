import { getLines } from "../utils.ts";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

async function main() {
  const lines = await getLines(3);

  let res = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const half = Math.ceil(line.length / 2);
    const firstHalf = line.slice(0, half);
    const secondHalf = line.slice(half);

    let map: { [key: string]: number } = {};

    for (const letter of firstHalf) {
      if (!map[letter]) {
        map[letter] = 0;
      }
      map[letter] += 1;
    }

    let set = new Set();

    for (const letter of secondHalf) {
      if (map[letter]) {
        set.add(letter);
      }
    }

    let letters: string[] = Array.from(set) as string[];

    res += letters
      .map((letter) => alphabet.indexOf(letter) + 1)
      .reduce((a, b) => a + b);
  }

  console.log(res);
}

main();
