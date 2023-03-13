import type { Stimulus } from "@/data/types";
import { random, randomColor } from "./rand";

const examLength = 20

function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = random(0, i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}


function createStimulus(congruent: boolean): Stimulus {
  const visual = randomColor()
  const lexical = congruent ? visual : randomColor(visual)
  return {
    visual,
    lexical,
    congruent,
  }
}

function range(max: number): number[] {
  return Array.from({ length: max }, (_, i) => i)
}

export function createStimuli(): Stimulus[] {
  const result = range(examLength).map(i => createStimulus(i % 2 === 0))
  shuffle(result)
  return result
}