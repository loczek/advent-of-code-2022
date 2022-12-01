async function getLines(day: number, useExample = false) {
  const file = await getFile(day, useExample);
  const lines = file.split("\r\n");
  return lines;
}

async function getFile(day: number, useExample = false) {
  const file = await Deno.readTextFile(
    `./${day < 10 ? "0" + day : day}/${useExample ? "example" : "input"}.txt`,
  );
  return file;
}

export { getFile, getLines };
