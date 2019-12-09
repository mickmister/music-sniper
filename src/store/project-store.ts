import axios, {AxiosResponse} from 'axios'
import {thunk, action, Action, Thunk} from 'easy-peasy'

import {Project} from '../types/music-types'

import {IGlobalStore} from './store-types'
export interface IProjectStore {
    projects: Project[];
    storeProjects: Action<IProjectStore, Project[]>;
    createOrUpdateProject: Thunk<IProjectStore, Project, void, IGlobalStore, Promise<AxiosResponse<Project | string>>>;
    fetchProjects: Thunk<IProjectStore, void, void, IGlobalStore, Promise<Project[]>>;
}

import {createOrUpdateEntity, storeEntities} from './shared-store-logic'
import {IBackendAPI} from '../services/backend-api'

const ProjectStore: IProjectStore = {
    projects: [],
    storeProjects: action((state, projects) => {
        storeEntities(state.projects, projects)
    }),
    createOrUpdateProject: thunk(async (actions, project, {injections}) => {
        const backendAPI = injections.backendAPI as IBackendAPI

        const res = (await backendAPI.upsertEntity('projects', project)) as AxiosResponse<Project>

        actions.storeProjects([res.data])
        return res
    }),

    fetchProjects: thunk(async (actions) => {
        const {data} = (await axios.get('/projects')) as AxiosResponse<Project[]>

        if (data) {
            actions.storeProjects(data)
        }

        return data as Project[]
    }),
}

export default ProjectStore
