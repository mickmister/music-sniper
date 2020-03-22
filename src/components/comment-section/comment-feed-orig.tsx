import React from 'react'
import {useStoreState, State} from 'easy-peasy'

import ReactTimeAgo from 'react-time-ago'
import {Feed, Form} from 'semantic-ui-react'

import {Comment} from '../../types/music-types'
import {IGlobalStore} from '../../store/store-types'

import CommentWord from './comment-word'

type Props = {
    comments: Comment[]
}

export default function FeedExampleBasic({comments}: Props) {
    const users = useStoreState((state: State<IGlobalStore>) => state.users.users)
    const currentUser = useStoreState((state: State<IGlobalStore>) => state.users.currentUser)

    const [editing, setEditing] = React.useState({})

    const editComment = (commentID, text) => {
        setEditing({
            ...editing,
            [commentID.toString()]: text,
        })
    }

    const saveComment = (commentID) => {
        const newState = {...editing}
        delete newState[commentID.toString()]
        setEditing(newState)
    }

    const cancelEdit = (commentID) => {
        const newState = {...editing}
        delete newState[commentID.toString()]
        setEditing(newState)
    }

    const commentComponents = comments.map((comment): React.ReactNode => {
        const user = users.find((u) => u.id === comment.user_id)
        let summary = null
        if (user) {
            summary = (
                <Feed.Summary>
                    <span className='inverted'>{user.username}</span>
                    <Feed.Date><ReactTimeAgo date={Date.parse(comment.created_at)}/></Feed.Date>
                </Feed.Summary>
            )
        }

        const isEditing = Object.keys(editing).includes(comment.id.toString())
        let textBody = (
            <Feed.Extra
                text={true}
                style={{whiteSpace: 'pre-line'}}
            >
                {comment.text.split(' ').map((word) => <CommentWord comment={comment} word={word}/>)}
            </Feed.Extra>
        )
        if (isEditing) {
            textBody = (
                <Form reply={true}>
                    <Form.TextArea
                        onChange={(e) => editComment(comment.id, e.target.value)}
                        style={{backgroundColor: 'black', width: '500px'}}
                        rows={6}
                        value={editing[comment.id.toString()]}
                    />
                    <button onClick={() => saveComment(comment.id)}>{'Save'}</button>
                    <button onClick={() => cancelEdit(comment.id)}>{'Cancel'}</button>
                </Form>
            )
        }

        let label = <Feed.Label/>
        if (user) {
            label = (
                <Feed.Label
                    image={user.image_url}
                />
            )
        }

        return (
            <React.Fragment key={comment.id}>
                <Feed.Event>
                    {label}
                    <Feed.Content>
                        {summary}
                        {textBody}
                    </Feed.Content>
                </Feed.Event>
                {currentUser.id === comment.user_id && !editing[comment.id.toString()] && (
                    <>
                        {/* <button
                            onClick={() => editComment(comment.id, comment.text)}
                        >
                            {'Edit'}
                        </button>
                        <button
                            onClick={() => editComment(comment.id, comment.text)}
                        >
                            {'Delete'}
                        </button> */}
                    </>
                )}
            </React.Fragment>
        )
    })

    return (
        <Feed>
            {commentComponents}
        </Feed>
    )
}
