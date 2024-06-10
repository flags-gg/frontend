import {atom} from 'jotai'

export interface IProject {
  id: string;
  name: string;
  project_id: string;
  agent_limit: number;
  logo: string;
}
const projectAtom = atom<IProject>({
  id: '',
  name: '',
  project_id: '',
  agent_limit: 0,
  logo: ''
})

export interface FlagAgent {
  id: string;
  name: string;
  agent_id: string;
  environment_limit: number;
  environments: []
  project_info: {
    project_id: string;
    name: string;
  }
}
const agentAtom = atom<FlagAgent>({
  id: '',
  name: '',
  agent_id: '',
  environment_limit: 0,
  environments: [],
  project_info: {
    project_id: '',
    name: '',
  }
})

export interface IEnvironment {
  id: string;
  name: string;
  environment_id: string;
  flags: [];
  secret_menu: {
    enabled: boolean;
    id: string;
  }
}
const environmentAtom = atom<IEnvironment>({
  id: '',
  name: '',
  environment_id: '',
  flags: [],
  secret_menu: {
    enabled: false,
    id: '',
  }
})

export interface secretMenu {
  id: string,
  menu_id: string,
  enabled: boolean,
  code: [],
  style: {
    closeButton: string,
    container: string,
    button: string,
    style_id: string,
  }
}
const menuAtom = atom<secretMenu>({
  id: '',
  menu_id: '',
  enabled: false,
  code: [],
  style: {
    closeButton: '',
    container: '',
    button: '',
    style_id: '',
  }
})

export {
  projectAtom,
  agentAtom,
  environmentAtom,
  menuAtom,
}
