import { colorSet } from "@/data/sets";
import type { Color } from "@/data/types";

export function random(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function randomColor(except?: Color): Color {
  let index
  if (except) {
    const exceptIndex = colorSet.indexOf(except)
    const randIndex = random(0, colorSet.length - 2)
    index = randIndex + (randIndex >= exceptIndex ? 1 : 0)

  } else {
    index = random(0, colorSet.length - 1)
  }
  return colorSet[index]
}