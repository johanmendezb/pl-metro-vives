import React from 'react'
import PropTypes from 'prop-types';

const BlogPost = ({ data, likes, likeAction }) => {
  const { photo, author, avatar, resume, views, comments } = data
  const topCardStyle = {
    backgroundImage: `url(${photo})`
  }
  return (
    <div className="post-card big-card" role={`${author} post`}>
      <div className="post-card__top" style={topCardStyle}></div>
      <div className="post-card__content">
        <div className="left-content">
          <img src={avatar} alt={author}/>
        </div>
        <div className="right-content">
          <h2>{author}</h2>
          <small>{resume}</small>
        </div>
      </div>
      <div className="post-card__bottom">
        <div className="col">
          <img
            src="./public/images/icons/preview.svg"
            alt="views"
            role="views" />
          <span>{views}</span></div>
        <div className="col">
          <img
          src="./public/images/icons/speech_bubble.svg"
          alt="comments"
          role="comments" />
          <span>{comments}</span></div>
        <div className="col likes" onClick={likeAction}>
          <img
            src="./public/images/icons/like.svg"
            alt="likes"
            role={`like ${author} post`} />
          <span>{likes}</span></div>
      </div>
    </div>
  )
}

BlogPost.propTypes = {
  data: PropTypes.object,
  likes: PropTypes.number,
  likeAction: PropTypes.func
}

export default BlogPost
