import { getLines } from "../utils.ts";

async function main() {
  const lines = await getLines(5);

  const stacks = [
    [],
    ["B", "S", "V", "Z", "G", "P", "W"],
    ["J", "V", "B", "C", "Z", "F"],
    ["V", "L", "M", "H", "N", "Z", "D", "C"],
    ["L", "D", "M", "Z", "P", "F", "J", "B"],
    ["V", "F", "C", "G", "J", "B", "Q", "H"],
    ["G", "F", "Q", "T", "S", "L", "B"],
    ["L", "G", "C", "Z", "V"],
    ["N", "L", "G"],
    ["J", "F", "H", "C"],
  ];

  for (let i = 10; i < lines.length; i++) {
    const [_, count, __, from, ___, to] = lines[i]
      .split(" ")
      .map((item) => Number(item));

    for (let j = 0; j < count; j++) {
      stacks[to].push(stacks[from].pop()!);
    }
  }

  let res = [];

  for (let i = 1; i < stacks.length; i++) {
    res.push(stacks[i][stacks[i].length - 1]);
  }

  console.log(res.join(""));
}

main();
