import {CodeOrg, Header, Blocks, Output} from './layout/CodeOrg'

export default function Lab() {
  return (
    <CodeOrg
      header={<Header><span>Toolbar can go here</span></Header>}
      blocks={<Blocks />}
      output={<Output />}
    />
  )
}
