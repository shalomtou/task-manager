export default function asciiArt(message: string | any[]) {
  const length = Array.isArray(message) ? message.length : message.length;
  const topBottomLine = ` ${"=".repeat(length + 4)}`;

  console.log(`
    ${topBottomLine}
    |  ${message}  |
    ${topBottomLine}
    `);
}
