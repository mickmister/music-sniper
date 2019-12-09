import axios, {AxiosResponse} from 'axios'
import {thunk, action, Action, Thunk} from 'easy-peasy'

type Folder = {
    id: number
    name: string
}

import {IGlobalStore} from './store-types'
export interface IFolderStore {
    folders: Folder[];
    storeFolders: Action<IFolderStore, Folder[]>;
    createOrUpdateFolder: Thunk<IFolderStore, Folder, void, IGlobalStore, Promise<AxiosResponse<Folder | string>>>;
    fetchFolders: Thunk<IFolderStore, void, void, IGlobalStore, Promise<Folder[]>>;
}

import {createOrUpdateEntity, storeEntities} from './shared-store-logic'

const FolderStore: IFolderStore = {
    folders: [],
    storeFolders: action((state, folders) => {
        storeEntities(state.folders, folders)
    }),
    createOrUpdateFolder: thunk(async (actions, folder) => {
        const res = (await createOrUpdateEntity('folders', folder)) as AxiosResponse<Folder>

        actions.storeFolders([res.data])
        return res
    }),

    fetchFolders: thunk(async (actions) => {
        const {data} = (await axios.get('/folders')) as AxiosResponse<Folder[]>

        if (data) {
            actions.storeFolders(data)
        }

        return data as Folder[]
    }),
}

export default FolderStore
