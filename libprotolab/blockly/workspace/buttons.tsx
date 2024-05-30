import { save, load } from './workspace'
import { run } from './run'

export const Run = () => (
  <button onClick={() => run()}>Run</button>
)

export const Reset = () => (
  <button>Reset</button>
)

export const Save = () => (
  <button onClick={() => save()}>Save</button>
)

export const Load = () => (
  <button onClick={() => load()}>Load</button>
)
