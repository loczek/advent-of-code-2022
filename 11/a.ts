import { getLines } from "../utils.ts";

async function main() {
  const lines = await getLines(11);

  const monkeys = [];

  for (let i = 0; i < lines.length; i = i + 7) {
    monkeys.push({
      items: lines[i + 1]
        .split("  Starting items: ")
        .flatMap((item) => item.split(","))
        .filter((item) => item !== "")
        .map((item) => Number(item)),
      operation: lines[i + 2].slice(13).replace("new", "worry"),
      test: Number(lines[i + 3].slice(21)),
      ifTrue: Number(lines[i + 4].slice(29)),
      ifFalse: Number(lines[i + 5].slice(30)),
      inspects: 0,
    });
  }

  for (let r = 0; r < 20; r++) {
    for (let i = 0; i < monkeys.length; i++) {
      for (let j = 0; j < monkeys[i].items.length; j++) {
        let old = monkeys[i].items[j];
        let worry: number;
        eval(monkeys[i].operation);
        // @ts-ignore
        let worryDevided = Math.floor(worry / 3);

        if (worryDevided % monkeys[i].test === 0) {
          monkeys[i].items[j] = -1;
          monkeys[monkeys[i].ifTrue].items.push(worryDevided);
        } else {
          monkeys[i].items[j] = -1;
          monkeys[monkeys[i].ifFalse].items.push(worryDevided);
        }
        monkeys[i].inspects += 1;
      }
      monkeys[i].items = monkeys[i].items.filter((item) => item !== -1);
    }
  }

  monkeys.sort((a, b) => b.inspects - a.inspects);
  console.log(monkeys);
  console.log(monkeys[0].inspects * monkeys[1].inspects);
}

console.log(await main());
