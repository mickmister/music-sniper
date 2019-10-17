import axios, { AxiosResponse, AxiosPromise } from 'axios'

import {IProjectStore} from './store-types'
import { thunk, action } from 'easy-peasy'
import { Project } from '../types/music-types'
import { createOrUpdateEntity, storeEntities } from './shared-store-logic'

const ProjectStore: IProjectStore = {
    projects: [],
    storeProjects: action((state, projects) => {
        storeEntities(state.projects, projects)
    }),
    createOrUpdateProject: thunk(async (actions, project) => {
        const res = (await createOrUpdateEntity('projects', project)) as AxiosResponse<Project>

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
