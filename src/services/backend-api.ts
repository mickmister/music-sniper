import axios, {AxiosResponse} from 'axios'

export type Entity = {
    id?: number
}

export interface APIResponse<T> {
    data: T
}

export interface IBackendAPI {
    fetchEntities: (name: string) => Promise<APIResponse<Entity[]>>
    getEntity: (name: string, id: number) => Promise<APIResponse<Entity>>
    upsertEntity: (name: string, entity: Entity) => Promise<APIResponse<Entity>>
    deleteEntity: (name: string, id: number) => Promise<APIResponse<Entity>>

    get: (url: string) => Promise<APIResponse<Entity[]>>
    post: (url: string, body: {}) => Promise<APIResponse<Entity>>
    put: (url: string, entity: Entity) => Promise<APIResponse<Entity>>
    delete: (url: string) => Promise<APIResponse<Entity>>
}

export class BackendAPI implements IBackendAPI {
    private store: any

    constructor(store: any) {
        this.store = store
    }

    get = axios.get
    post = axios.post
    put = axios.put
    delete = axios.delete

    fetchEntities = async (name: string) => {
        let res
        res = await this.get(`/${name}`)

        res = res.response || res as AxiosResponse<Entity | string>

        if (res.status >= 400) {
            throw new Error(res.data as string)
        }

        return res
    }

    getEntity = async (name: string, id: number) => {
        let res
        res = await this.get(`/${name}/${id}`)

        res = res.response || res as AxiosResponse<Entity | string>

        if (res.status >= 400) {
            throw new Error(res.data as string)
        }

        return res
    }

    upsertEntity = async (name: string, entity: Entity) => {
        let res
        if (entity.id) {
            res = await this.put(`/${name}/${entity.id}`, entity)
        } else {
            res = await this.post(`/${name}`, entity)
        }

        res = res.response || res as AxiosResponse<Entity | string>

        if (res.status >= 400) {
            throw new Error(res.data as string)
        }

        return res
    }

    deleteEntity = async (name: string, id: number) => {
        let res
        if (id) {
            res = await this.delete(`/${name}/${id}`)
        }

        res = res.response || res as AxiosResponse<Entity | string>

        if (res.status >= 400) {
            throw new Error(res.data as string)
        }

        return res
    }
}

export class MockBackendAPI implements IBackendAPI {
    private store: any

    static MockObjects = {
        audio_files: {},
    }

    constructor(store: any) {
        this.store = store
    }

    fetchEntities = async (name: string) => {
        return {data: [{id: 1}]}
    }

    getEntity = async (name: string, id: number) => {
        return {data: {id}}
    }

    upsertEntity = async (name: string, entity: Entity) => {
        if (entity.id) {
            return {data: entity}
        }
        return {data: {...entity, id: 1}}
    }

    deleteEntity = async (name: string, id: number) => {
        return {data: {id}}
    }
}
