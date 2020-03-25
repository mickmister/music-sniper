import React from 'react'
import {useStoreState, State} from 'easy-peasy'

import {Comment as UIComment} from 'semantic-ui-react'
import ReactTimeAgo from 'react-time-ago'

import {Comment} from '../../types/music-types'
import {IGlobalStore} from '../../store/store-types'

import CommentWord from './comment-word'
import SavedComment from './saved-comment'

type Props = {
    comments: Comment[]
}

export default function CommentFeed({comments, saveComment, deleteComment}: Props) {
    const commentComponents = comments.map((comment) => (
        <CommentComponent
            key={comment.id}
            comment={comment}
            saveComment={saveComment}
            deleteComment={deleteComment}
        />
    ))

    return (
        <UIComment.Group>
            {commentComponents}
        </UIComment.Group>
    )
}

type CommentComponentProps = {
    comment: Comment
    saveComment: (c: Comment) => void
    deleteComment: (c: Comment) => void
}

function CommentComponent({comment, saveComment, deleteComment}: CommentComponentProps) {
    const users = useStoreState((state: State<IGlobalStore>) => state.users.users)
    const currentUser = useStoreState((state: State<IGlobalStore>) => state.users.currentUser)
    const [editing, setEditing] = React.useState(false)

    const user = users.find((u) => u.id === comment.user_id)
    let avatarURL = ''
    let username = ''
    if (user) {
        avatarURL = user.image_url
        username = user.username
    }

    const textComponents = (
        comment.text.replace(/\n/g, '\n ').split(' ').map((word, i) => (
            <CommentWord
                key={i}
                comment={comment}
                word={word}
            />
        ))
    )

    let commentComponent = (
        <UIComment
            style={{
                paddingBottom: '20px',
                // border: '1px solid'
            }}
        >
            <UIComment.Avatar src={avatarURL}/>
            <UIComment.Content>
                <UIComment.Author as='a'>{username}</UIComment.Author>
                <UIComment.Metadata>
                    <div><ReactTimeAgo date={Date.parse(comment.created_at)}/></div>
                </UIComment.Metadata>
                <UIComment.Text style={{whiteSpace: 'pre-line'}}>
                    {textComponents}
                </UIComment.Text>
                <UIComment.Actions>
                    {currentUser.id === comment.user_id && <UIComment.Action onClick={() => setEditing(true)}>{'Edit'}</UIComment.Action>}
                </UIComment.Actions>
            </UIComment.Content>
        </UIComment>
    )

    const save = async (c: Comment) => {
        if (!confirm('Save comment?')) {
            return
        }
        await saveComment(c)
        setEditing(false)
    }

    const cancel = () => {
        if (!confirm('Cancel edit?')) {
            return
        }
        setEditing(false)
    }

    const del = (c: Comment) => {
        if (!confirm('Delete comment?')) {
            return
        }
        deleteComment(c)
    }

    if (editing) {
        commentComponent = (
            <SavedComment
                comment={comment}
                saveComment={save}
                deleteComment={del}
                onCancel={cancel}
            />
        )
    }
    return (
        <React.Fragment>
            {commentComponent}
            <hr/>
        </React.Fragment>
    )
}
