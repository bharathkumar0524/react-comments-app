import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {name: '', comment: '', commentsList: []}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const bgColor =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      bgColor,
      isLiked: false,
      date: new Date(),
    }
    this.setState(prev => ({
      commentsList: [...prev.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  onClickCommentDelete = uid => {
    const {commentsList} = this.state
    const filterComments = commentsList.filter(
      eachComment => eachComment.id !== uid,
    )
    this.setState(prevState => ({...prevState, commentsList: filterComments}))
  }

  likeComment = uid => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === uid) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {name, comment, commentsList} = this.state
    const count = commentsList.length

    return (
      <div className="app-container">
        <div className="comments-app-container">
          <form className="comment-form-container" onSubmit={this.onAddComment}>
            <h1 className="form-heading">Comments</h1>
            <p className="label">Say something about 4.0 Technologies</p>
            <input
              onChange={this.onChangeName}
              className="name"
              placeholder="Your Name"
              value={name}
            />
            <textarea
              rows="6"
              cols="25"
              onChange={this.onChangeComment}
              placeholder="Your Comment"
              className="comment"
              value={comment}
            />
            <button type="submit" className="button">
              Add Comment
            </button>
          </form>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comment-img"
            />
          </div>
        </div>

        <ul className="comment-item">
          <p className="comment-title">
            <span className="count">{count}</span>Comments
          </p>
          {commentsList.map(eachComment => (
            <CommentItem
              commentItem={eachComment}
              key={eachComment.id}
              onClickCommentDelete={this.onClickCommentDelete}
              likeComment={this.likeComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default Comments
