import axios from 'axios'
import {thunk, action, computed, Action, Thunk, Computed} from 'easy-peasy'

import {Comment} from '../types/music-types'

import {IGlobalStore} from './store-types'

export interface ICommentStore {
    items: Comment[];
    saveComment: Thunk<ICommentStore, Comment>;
    deleteComment: Thunk<ICommentStore, Comment>;
    removeComment: Action<ICommentStore, Comment>;
    storeComment: Action<ICommentStore, Comment>;
    addComments: Action<ICommentStore, Comment[]>;
    fetchComments: Thunk<ICommentStore, number | void, void, IGlobalStore, Promise<Comment[]>>;
    commentsForAudioFile: Computed<ICommentStore, Comment[]>;
}

const upsert = async (name: string, payload: {}) => {
    const id = payload.id

    let res
    if (id) {
        res = await axios.put(`/${name}/${id}`, payload)
    } else {
        res = await axios.post(`/${name}`, payload)
    }
    return res.data
}

const deleteRecord = (name: string, payload: {id: number}) => {
    const id = payload.id

    return axios.delete(`/${name}/${id}`)
}

export const CommentStore: ICommentStore = {
    items: [],

    saveComment: thunk(async (dispatch, comment: Comment) => {
        const newComment = await upsert('comments', comment)
        dispatch.storeComment(newComment)
        return newComment
    }),

    deleteComment: thunk(async (dispatch, comment: Comment) => {
        await deleteRecord('comments', comment)
        dispatch.removeComment(comment)
    }),

    removeComment: action((state, payload) => {
        const index = state.items.findIndex((com) => com.id === payload.id)
        state.items.splice(index, 1)
    }),

    storeComment: action((state, comment: Comment) => {
        const comments = state.items

        const index = comments.findIndex((com: Comment) => com.id === comment.id)
        if (index > -1) {
            comments[index] = comment
        } else {
            comments.push(comment)
        }
    }),

    addComments: action((state, comments: Comment[]) => {
        comments.forEach((comment) => {
            const index = state.items.findIndex((com: Comment) => com.id === comment.id)
            if (index > -1) {
                state.items[index] = comment
            } else {
                state.items.push(comment)
            }
        })
    }),

    fetchComments: thunk(async (dispatch, audioFileId) => {
        let params = {}
        if (audioFileId) {
            params = {commentable_type: 'AudioFile', commentable_id: audioFileId}
        }
        const {data} = await axios.get('/comments', {params})

        if (data) {
            dispatch.addComments(data)
        }
        return data
    }),

    commentsForAudioFile: computed((state) => (audio_file: AudioFile) => {
        return state.items.filter(c => c.commentable_type === 'AudioFile' && c.commentable_id === audio_file.id).
            sort((com1, com2) => (com1.created_at < com2.created_at) - (com1.created_at > com2.created_at))
    }),
}

export default CommentStore
