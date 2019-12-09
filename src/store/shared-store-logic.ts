import axios, {AxiosResponse} from 'axios'

export type Entity = {
    id?: number
}

export async function createOrUpdateEntity(name: string, entity: Entity): Promise<AxiosResponse<Entity>> {
    let res
    if (entity.id) {
        res = await axios.put(`/${name}/${entity.id}`, entity)
    } else {
        res = await axios.post(`/${name}`, entity)
    }

    res = res.response || res as AxiosResponse<Entity | string>

    if (res.status >= 400) {
        throw new Error(res.data as string)
    } else if (!res.data.id) {
        throw new Error('didnt create')
    }

    return res
}

export function storeEntities(existing: Entity[], toAdd: Entity[]) {
    for (const entity of toAdd) {
        const index = existing.findIndex((e) => e.id === entity.id)
        if (index > -1) {
            existing.splice(index, 1, entity)
        } else {
            existing.push(entity)
        }
    }
}
