import {atom} from 'jotai'

const projectAtom = atom({
  id: '',
  name: '',
  project_id: '',
})

const agentAtom = atom({
  id: '',
  name: '',
  agent_id: '',
  environments: []
})

const environmentAtom = atom({
  id: '',
  name: '',
  environment_id: '',
  flags: [],
  secretMenu: {}
})

export {
  projectAtom,
  agentAtom,
  environmentAtom
}
