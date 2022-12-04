import { getLines } from "../utils.ts";

async function main() {
  const lines = await getLines(4);

  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    const [first, second] = lines[i].split(",");
    const [firstStart, firstEnd] = first.split("-");
    const [secondStart, secondEnd] = second.split("-");

    if (
      (+firstStart <= +secondStart && +firstEnd >= +secondStart) ||
      (+firstStart >= +secondStart && +firstStart <= +secondEnd)
    ) {
      count++;
    }
  }

  console.log(count);
}

main();
