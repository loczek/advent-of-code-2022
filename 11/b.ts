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
        .map((item) => BigInt(item)),
      operation: lines[i + 2]
        .slice(13)
        .replace("new", "worry")
        .split(" ")
        .map((item) => (isNaN(Number(item)) ? item : `${item}n`))
        .join(" "),
      test: BigInt(lines[i + 3].slice(21)),
      ifTrue: Number(lines[i + 4].slice(29)),
      ifFalse: Number(lines[i + 5].slice(30)),
      inspects: 0,
    });
  }
  console.log(monkeys);

  const supermodulo = monkeys.map((a) => a.test).reduce((a, b) => a * b);
  for (let r = 0; r < 10_000; r++) {
    console.log(r);
    for (let i = 0; i < monkeys.length; i++) {
      for (let j = 0; j < monkeys[i].items.length; j++) {
        let old = monkeys[i].items[j];
        let worry: bigint = 1n;
        eval(monkeys[i].operation);

        let worryDevided = worry % supermodulo;
        if (BigInt(worryDevided) % BigInt(monkeys[i].test) === 0n) {
          monkeys[i].items[j] = -1n;
          monkeys[monkeys[i].ifTrue].items.push(worryDevided);
        } else {
          monkeys[i].items[j] = -1n;
          monkeys[monkeys[i].ifFalse].items.push(worryDevided);
        }
        monkeys[i].inspects += 1;
      }
      monkeys[i].items = monkeys[i].items.filter((item) => item !== -1n);
    }
  }

  monkeys.sort((a, b) => b.inspects - a.inspects);
  return monkeys[0].inspects * monkeys[1].inspects;
}
console.log(await main());
