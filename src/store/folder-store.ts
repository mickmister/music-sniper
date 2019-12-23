import axios, {AxiosResponse} from 'axios'
import {thunk, action, Action, Thunk, computed, Computed, useStoreState, State} from 'easy-peasy'

import {Folder, FolderItem, Entity, FolderItemWithEntity, ModelNames} from '../types/music-types'

import {IGlobalStore} from './store-types'
import {createOrUpdateEntity, storeEntities} from './shared-store-logic'

export interface IFolderStore {
    folders: Folder[];
    folderItems: FolderItem[]
    getFolder: Computed<IFolderStore, (id?: number) => Folder>
    getParentFolder: Computed<IFolderStore, (id?: number) => Folder>
    getChildFolders: Computed<IFolderStore, (id?: number) => Folder[]>
    getFolderItems: Computed<IFolderStore, (id?: number) => FolderItemWithEntity[], IGlobalStore>
    storeFolders: Action<IFolderStore, Folder[]>;
    createOrUpdateFolder: Thunk<IFolderStore, Folder, void, IGlobalStore, Promise<AxiosResponse<Folder | string>>>;
    fetchFolders: Thunk<IFolderStore, void, void, IGlobalStore, Promise<Folder[]>>;
    addFolderItem: Action<IFolderStore, FolderItem>
    removeFolderItem: Action<IFolderStore, FolderItem>
}

const FolderStore: IFolderStore = {
    folders: [
        {
            id: 1,
            name: 'Jams',
            description: 'Straight Jams',
        },
        {
            id: 2,
            name: '2018 Jams',
            description: 'Radical Jams recorded in 2018',
            parent_id: 1,
        },
        {
            id: 3,
            name: '2018 October Jams',
            description: 'Sweet Jams recorded in October of 2018',
            parent_id: 2,
        },
        {
            id: 4,
            name: '2019 Jams',
            description: 'Nice Jams recorded in 2019',
            parent_id: 1,
        },
        {
            id: 5,
            name: '2019 April Jams',
            description: 'Jams recorded in April of 2019',
            parent_id: 4,
        },
        {
            id: 6,
            name: '2019 November Jams',
            description: 'Jams recorded in November of 2019',
            parent_id: 4,
        },
    ],

    storeFolders: action((state, folders) => {
        storeEntities(state.folders, folders)
    }),
    createOrUpdateFolder: thunk(async (actions, folder, {getState}) => {
        const payload = folder
        if (folder.id) {
            const folderItems = getState().getChildFolders(folder.id)
        }

        const res = (await createOrUpdateEntity('folders', payload)) as AxiosResponse<Folder>

        actions.storeFolders([res.data])
        return res
    }),

    getChildFolders: computed((state) => (folderId) => {
        return state.folders.filter((f) => f.parent_id === folderId)
    }),

    getFolder: computed((state) => (folderId) => {
        return state.folders.find((f) => f.id === folderId)
    }),

    getParentFolder: computed((state) => (folderId) => {
        const folder = state.folders.find((f) => f.id === folderId)
        if (!folder || !folder.parent_id) {
            return null
        }

        return state.folders.find((f) => f.id === folder.parent_id)
    }),

    folderItems: [
        {folder_id: 1, item_type: ModelNames.AudioFile, item_id: 15},
        {folder_id: 1, item_type: ModelNames.Clip, item_id: 16},
    ],

    getFolderItems: computed(
        [
            (state) => state.folders,
            (state) => state.folderItems || [],
            (state, storeState) => storeState.songs.audioFiles,
            (state, storeState) => storeState.songs.clips,
        ],
        (folders, folderItems, audioFiles, clips) => (id: number) => {
            return folderItems.filter((item) => {
                return item.folder_id === id &&
                ((item.item_type === ModelNames.AudioFile && audioFiles.find((f) => f.id === item.item_id)) ||
                (item.item_type === ModelNames.Clip && clips.find((f) => f.id === item.item_id)))
            }).map((item) => {
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
            })

            // return id === 1 ? audioFiles : []
        }
    ),

    fetchFolders: thunk(async (actions) => {
        const {data} = (await axios.get('/folders')) as AxiosResponse<Folder[]>

        if (data) {
            actions.storeFolders(data)
        }

        return data as Folder[]
    }),

    addFolderItem: action((state, item) => {
        state.folderItems.push(item)
    }),

    removeFolderItem: action((state, item) => {
        state.folderItems.push(item)
    }),
}

export class FolderStoreState {
    getFolder = (folderId: number) => useStoreState((state: State<IGlobalStore>) => state.folders.getFolder)(folderId)
    getFolderItems = (folderId: number) => useStoreState((state: State<IGlobalStore>) => state.folders.getFolderItems)(folderId)
    getParentFolder = (folderId: number) => useStoreState((state: State<IGlobalStore>) => state.folders.getParentFolder)(folderId)
    getChildFolders = (folderId: number) => useStoreState((state: State<IGlobalStore>) => state.folders.getChildFolders)(folderId)
}

export default FolderStore
