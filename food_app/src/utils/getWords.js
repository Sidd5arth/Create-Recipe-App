export function getWords(str) {
  return str.split(",").map((word) => word.trim());
}
export function getWord(str) {
  return str.split("|").map((word) => word.trim());
}
