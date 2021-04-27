// @ts-ignore
interface String {
  truncate(limit: number): string;
}

String.prototype.truncate = function(limit: number, end: string = "..."): string {
  const words = this.split(" ");
  const totalWords = words.length;

  if (totalWords <= limit)
    return this.toString();

  if (totalWords > limit) {
    const truncatedWords = words.slice(0, limit);
    return `${truncatedWords.join(" ")} ${end}`;
  }

  return `${words.join(" ")} ${end}`;
};