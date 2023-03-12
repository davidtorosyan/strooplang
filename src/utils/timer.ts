export class Timer {
  startTimeMs = performance.now()

  elapsedMs(): number {
    return Math.round(performance.now() - this.startTimeMs)
  }

  reset() {
    this.startTimeMs = performance.now()
  }
}