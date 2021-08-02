import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const likedImageUrl =
    'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
  const likeImageUrl =
    'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const deleteImageUrl =
    'https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png'
  const {commentItem, onClickCommentDelete, likeComment} = props
  const {id, name, comment, isLiked, bgColor, date} = commentItem
  const likedImageUrlClassName = isLiked
    ? [likedImageUrl, 'like']
    : [likeImageUrl, 'unlike']
  const initialCharacter = name.slice(0, 1)

  const deleteComment = () => {
    onClickCommentDelete(id)
  }
  const onClickLikeButton = () => {
    likeComment(id)
  }

  return (
    <li className="item-container">
      <div className="comment-item-container">
        <p className={`initial-char ${bgColor}`}>{initialCharacter}</p>
        <div className="comment-section">
          <div className="set-date">
            <h1 className="comment-heading">{name}</h1>
            <p className="date">{formatDistanceToNow(date)}</p>
          </div>
          <p className="comment-description">{comment}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <div className="like-container">
          <button
            type="button"
            className="like-button"
            onClick={onClickLikeButton}
          >
            <img
              src={likedImageUrlClassName[0]}
              alt="like"
              className="like-img"
            />
          </button>
          <p className={`like-description ${likedImageUrlClassName[1]}`}>
            Like
          </p>
        </div>
        <div>
          <button
            className="like-button"
            type="button"
            testid="delete"
            onClick={deleteComment}
          >
            <img src={deleteImageUrl} alt="delete" />
          </button>
        </div>
      </div>
      <hr className="horizontal-line" />
    </li>
  )
}

export default CommentItem
