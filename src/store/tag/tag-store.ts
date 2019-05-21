import {select} from 'easy-peasy'
import { ITagStore } from '../store-types';

export const TagStore: ITagStore = {
  items: [{id: 1, name: 'Fun'}],
  setTags: (state, tags) => {
    state.items = tags
  }
}

export default TagStore
