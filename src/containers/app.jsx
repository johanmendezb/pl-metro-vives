// Base
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

// Components
import LanguageSwitch from 'components/language_switch/language_switch'
import MenuItem from 'components/menu/menu_item'
import BlogPost from 'components/blog/blog_post'

// Actions
import LanguageActions from 'reducers/languages_redux'
import PostActions from 'reducers/post_redux'

// Helpers
import { getLanguage } from '../base/js/utils'

const App = ({
  state,
  languages,
  fetchLanguage,
  currentLanguage,
  changeLanguage,
  likes,
  incrementLikes }) => {

  console.log("STATE: ", state)
  console.log("likes: ", likes)
  const language = currentLanguage === 'es' ? languages.es : languages.en

  const navItems = [
    {
      "iconUrl": "./public/images/icons/pin_map_icon.svg",
      "label": "check in",
      "notification": 3,
      "action": "#",
    },
    {
      "iconUrl": "./public/images/icons/heart_gray.svg",
      "label": "events",
      "action": "#",
    },
    {
      "iconUrl": "./public/images/icons/account.svg",
      "label": "account",
      "action": "#",
    },
    {
      "iconUrl": "./public/images/icons/settings.svg",
      "label": "settings",
      "action": "#",
    }
  ]
  const postItems = {
    "photo": "./public/images/post_bg.png",
    "author": "Jhon Raymons",
    "avatar": "./public/images/profile_pic.png",
    "resume": "Your talent amazes! This is awesome. Excited to see the final product.",
    "views": 172,
    "comments": 34
  }

  return (
    <div>
      <LanguageSwitch action={changeLanguage} language={currentLanguage} />
      <section className="menu" >
        {
          navItems.map((navItem, key) =>
            <MenuItem
              key={key}
              iconUrl={navItem.iconUrl}
              label={getLanguage(language, navItem.label)}
              notification={navItem.notification}
              action={navItem.action} />
          )
        }
      </section>
      <section className="content">
        <BlogPost
          data={postItems}
          likes={likes}
          likeAction={() => incrementLikes()} />
      </section>
        <div className="details">
          {/* Object.keys(objectDetails).length !== 0 &&
            <ComponentName details={objectDetails} />
          */}
        </div>
        <button className="button" type="button" onClick={() => fetchLanguage()}>get lang</button>
      <footer className="text-center">
        <p>&copy; Metro vives</p>
      </footer>
    </div>
  )
}

const mapStateToProps = state => ({
  languages: state.languages.languages,
  currentLanguage: state.languages.current,
  likes: state.post.likes,
  state: state
})

const mapDispatchToProps = dispatch => ({
  // Language switch
  fetchLanguage: () => dispatch(LanguageActions.fetchLanguages()),
  changeLanguage: currentLanguage => dispatch(LanguageActions.changeLanguage(currentLanguage)),

  // Post
  incrementLikes: () => dispatch(PostActions.incrementLikes()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
