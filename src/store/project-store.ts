import axios, {AxiosResponse} from 'axios'
import {thunk, action, Action, Thunk, computed, Computed} from 'easy-peasy'

import {Project, ProjectAttachmentWithEntity, ModelNames} from '../types/music-types'
import {IBackendAPI} from '../services/backend-api'

import {IGlobalStore} from './store-types'
export interface IProjectStore {
    projects: Project[];
    storeProjects: Action<IProjectStore, Project[]>;
    createOrUpdateProject: Thunk<IProjectStore, Project, void, IGlobalStore, Promise<AxiosResponse<Project | string>>>;
    fetchProjects: Thunk<IProjectStore, void, void, IGlobalStore, Promise<Project[]>>;
    getProjectAttachments: Computed<IProjectStore, (id?: number) => ProjectAttachmentWithEntity[], IGlobalStore>
}

import {createOrUpdateEntity, storeEntities} from './shared-store-logic'

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

    getProjectAttachments: computed(
        [
            (state) => state.projects,
            (state, storeState) => storeState.songs.audioFiles,
            (state, storeState) => storeState.songs.clips,
        ],
        (projects, audioFiles, clips) => (id: number) => {
            const project = projects.find((p) => p.id === id)
            if (!project) {
                return []
            }

            return project.project_attachments.map((item) => {
                let entity
                switch (item.item_type) {
                case ModelNames.AudioFile:
                    entity = audioFiles.find((e) => e.id === item.item_id)
                    break
                case ModelNames.Clip:
                    entity = clips.find((e) => e.id === item.item_id)
                }

                return {
                    ...item,
                    entity,
                }
            }).filter((a) => a.entity)
        }
    ),
}

export default ProjectStore
