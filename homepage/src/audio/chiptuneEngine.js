// 4-channel WebAudio chiptune — E natural minor, 150 BPM
// Channels: square lead · triangle bass · square arp · sawtooth hihat

const BPM = 150
const STEP = 60 / BPM / 4  // 16th note duration in seconds
const PATTERN = 32          // steps per loop

// Frequencies (Hz). 0 = rest.
const LEAD = [
  659, 0, 784, 0, 659, 0, 494, 0,   587, 659, 0, 0, 494, 392, 330, 0,
  440, 0, 523, 0, 440, 0, 392, 0,   523, 440, 392, 330, 294, 330, 392, 0,
]

const BASS = [82, 82, 82, 98, 98, 98, 82, 82]  // 8 quarter-note slots (step % 4 === 0)

const ARP = [
  165, 247, 196, 247,   165, 247, 196, 330,
  220, 330, 262, 330,   196, 294, 247, 330,
  165, 247, 196, 247,   165, 247, 262, 330,
  175, 262, 220, 330,   196, 294, 247, 392,
]

function noteOn(ctx, freq, startTime, duration, type, gain) {
  if (!freq) return
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  g.gain.setValueAtTime(gain, startTime)
  g.gain.setTargetAtTime(0.001, startTime + duration * 0.85, duration * 0.08)
  osc.connect(g)
  g.connect(ctx.destination)
  osc.start(startTime)
  osc.stop(startTime + duration + 0.02)
}

export class ChiptuneEngine {
  constructor() {
    this._ctx = null
    this._step = 0
    this._next = 0
    this._raf = 0
    this._running = false
  }

  start() {
    if (this._running) return
    this._ctx = new AudioContext()
    this._step = 0
    this._next = this._ctx.currentTime + 0.05
    this._running = true
    this._tick()
  }

  stop() {
    this._running = false
    cancelAnimationFrame(this._raf)
    if (this._ctx) {
      this._ctx.close()
      this._ctx = null
    }
  }

  toggle() {
    this._running ? this.stop() : this.start()
    return this._running
  }

  get running() { return this._running }

  _tick() {
    const ctx = this._ctx
    if (!ctx || !this._running) return

    while (this._next < ctx.currentTime + 0.4) {
      const s = this._step % PATTERN
      const t = this._next

      // Lead — square wave
      noteOn(ctx, LEAD[s], t, STEP * 1.1, 'square', 0.18)

      // Bass — triangle, every quarter note
      if (s % 4 === 0) {
        const bi = Math.floor(s / 4) % BASS.length
        noteOn(ctx, BASS[bi], t, STEP * 3.6, 'triangle', 0.32)
      }

      // Arp — square, every 8th note (every 2 steps)
      if (s % 2 === 0) {
        noteOn(ctx, ARP[s >> 1], t, STEP * 0.9, 'square', 0.10)
      }

      // Hi-hat sim — high sawtooth, every 8th note with slight pitch randomness
      if (s % 2 === 0) {
        const hf = 900 + (s % 4) * 120
        noteOn(ctx, hf, t, STEP * 0.12, 'sawtooth', 0.06)
      }

      this._next += STEP
      this._step++
    }

    this._raf = requestAnimationFrame(() => this._tick())
  }
}
