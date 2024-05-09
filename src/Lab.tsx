import {CodeOrg, Header, Blocks, Output} from './layout/CodeOrg'

export default function Lab() {
  return (
    <CodeOrg
      header={<Header toolbar={<span>TOOLBAR</span>} />}
      blocks={<Blocks />}
      output={<Output />}
    />
  )
}
