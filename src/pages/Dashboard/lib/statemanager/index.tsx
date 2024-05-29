import {atom} from 'jotai'

const projectAtom = atom({
  id: '',
  name: '',
  project_id: '',
})

const agentIdAtom = atom('')

export {
  projectAtom,
  agentIdAtom
}
