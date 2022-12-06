import { getFile } from "../utils.ts";

async function main() {
  const file = await getFile(6);

  for (let i = 3; i < file.length; i++) {
    const set = new Set();

    for (let j = i; j > i - 4; j--) {
      set.add(file[j]);
    }

    if (set.size === 4) {
      return i + 1;
    }
  }
}
console.log(await main());
