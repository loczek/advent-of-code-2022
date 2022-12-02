import { getLines } from "../utils.ts";

async function main() {
  const lines = await getLines(2);

  const winMap = {
    A: "Y",
    B: "Z",
    C: "X",
  } as const;
  const drawMap = {
    A: "X",
    B: "Y",
    C: "Z",
  } as const;
  const pointsMap = {
    X: 1,
    Y: 2,
    Z: 3,
  };

  let res = 0;

  for (const line of lines) {
    let [him, me] = line.split(" ") as ["A" | "B" | "C", "X" | "Y" | "Z"];

    res += pointsMap[me];
    if (winMap[him] === me) {
      res += 6;
    } else if (drawMap[him] === me) {
      res += 3;
    }
  }
  console.log(res);
}

main();
