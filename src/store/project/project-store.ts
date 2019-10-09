import axios, { AxiosResponse, AxiosPromise } from 'axios'

import {IProjectStore} from '../store-types'
import { thunk, action } from 'easy-peasy'
import { Project } from '../../types/music-types'

const ProjectStore: IProjectStore = {
    projects: [],
    storeProjects: action((state, projects) => {
        for (const project of projects) {
            const index = state.projects.findIndex(p => p.id === project.id)
            if (index > -1) {
                state.projects.splice(index, 1, project)
            } else {
                state.projects.push(project)
            }
        }
    }),
    createOrUpdateProject: thunk(async (actions, project) => {
        let res;
        if (project.id) {
            res = await axios.put(`/projects/${project.id}`, project)
        } else {
            res = await axios.post('/projects', project)
        }

        res = res.response || res as AxiosResponse<Project | string>

        if (res.status >= 400) {
            throw new Error(res.data as string)
        } else if (!res.data.id) {
            throw new Error('didnt create')
        }

        actions.storeProjects([res.data] as Project[])
        return res
    }),
    fetchProjects: thunk(async (actions) => {
        const {data} = await axios.get('/projects')

        if (data) {
          actions.storeProjects(data as Project[])
        }

        return data as Project[]
    }),
}

export default ProjectStore
