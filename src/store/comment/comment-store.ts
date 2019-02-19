import axios from 'axios'
import {effect} from 'easy-peasy'

import {Comment} from '../../types/music-types'

const upsert = async (name: string, payload: {}) => {
  const id = payload.id

  let res
  if (id) {
    res = await axios.put(`/${name}/${id}`, payload)
  }
  else {
    res = await axios.post(`/${name}`, payload)
  }
  return res.data
}

const deleteRecord = (name: string, payload: {}) => {
  const id = payload.id

  return axios.delete(`/${name}/${id}`)
}

const defaultState = [
  {
    id: 1,
    user_id: 1,
    audio_file_id: 1,
    created_at: '',
    text: 'Nice fill! Totally dude, sick fill. Totally dude, sick fill.',
  },
  {
    id: 2,
    user_id: 2,
    created_at: '',
    text: 'Totally dude, sick fill. Totally dude, sick fill. Totally dude, sick fill. Totally dude, sick fill.',
  },
] as Comment[]

export const CommentStore = {
  items: [],

  saveComment: effect(async (dispatch, comment: Comment) => {
    const newComment = await upsert('comments', comment)
    dispatch.comments.storeComment(newComment)
    return newComment
  }),

  deleteComment: effect(async (dispatch, comment: Comment) => {
    await deleteRecord('comments', comment)
    dispatch.comments.removeComment(comment)
  }),

  removeComment: (state, payload) => {
    const index = state.items.findIndex(com => com.id === payload.id)
    state.items.splice(index, 1)
  },

  storeComment: (state, comment: Comment) => {
    const comments = state.items

    const index = comments.findIndex((com: Comment) => com.id === comment.id)
    if (index > -1) {
      comments[index] = comment
    }
    else {
      comments.push(comment)
    }
  },

  addComments: (state: {}, comments: Comment[]) => {
    comments.forEach(comment => {
      const index = state.items.findIndex((com: Comment) => com.id === comment.id)
      if (index > -1) {
        state.items[index] = comment
      }
      else {
        state.items.push(comment)
      }
    })
  },

  fetchComments: effect(async (dispatch: any, audioFileId: number) => {
    const {data} = await axios.get('/comments', {params: {audio_file_id: audioFileId}})

    if (data) {
      dispatch.comments.addComments(data)
    }
  }),
}

export default CommentStore
