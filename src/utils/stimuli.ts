import type { Stimulus } from "@/data/types";
import { random, randomColor } from "./rand";

const examLength = 5

function createStimulus(): Stimulus {
  const congruent = random(0, 1) === 1
  const visual = randomColor()
  const lexical = congruent ? visual : randomColor()
  return {
    visual,
    lexical,
    congruent,
  }
}

export function createStimuli(): Stimulus[] {
  return Array.from({ length: examLength }, createStimulus);
}