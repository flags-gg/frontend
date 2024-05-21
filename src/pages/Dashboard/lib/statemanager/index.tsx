import {atom} from 'jotai'

const projectAtom = atom({
  id: '',
  name: ''
})

const agentIdAtom = atom('')

export {
  projectAtom,
  agentIdAtom
}
