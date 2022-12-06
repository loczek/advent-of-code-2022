import { getFile } from "../utils.ts";

async function main() {
  const file = await getFile(6);

  for (let i = 13; i < file.length; i++) {
    const set = new Set();

    for (let j = i; j > i - 14; j--) {
      set.add(file[j]);
    }

    if (set.size === 14) {
      return i + 1;
    }
  }
}
console.log(await main());
