// Base
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

// Components
import LanguageSwitch from 'components/language_switch/language_switch'
import MenuItem from 'components/menu/menu_item'
import BlogPost from 'components/blog/blog_post'
import ProfileMenu from 'components/profile/profile_menu'

// Actions
import LanguageActions from 'reducers/languages_redux'
import PostActions from 'reducers/post_redux'

// Helpers
import { getLanguage, numberFormat } from '../base/js/utils'
import {
  navItems,
  postItems,
  profileMenuItems } from '../base/data/components_data'

const App = ({
  state,
  languages,
  fetchLanguage,
  currentLanguage,
  changeLanguage,
  likes,
  incrementLikes }) => {

  console.log("STATE: ", state)

  const language = currentLanguage === 'es' ? languages.es : languages.en

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

        <ProfileMenu
          language={language}
          userName="courtney timmons"
          profilePic="./public/images/profile_pic.png"
          followers={numberFormat(123123)}
          menuItems={profileMenuItems} />
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
