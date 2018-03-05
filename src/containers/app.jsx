// Base
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

// Components
import LanguageSwitch from 'components/language_switch/language_switch'
import MenuItem from 'components/menu/menu_item'
import BlogPost from 'components/blog/blog_post'
import ProfileMenu from 'components/profile/profile_menu'
import ContactForm from 'components/forms/contact_form'

// Actions
import LanguageActions from 'reducers/languages_redux'
import PostActions from 'reducers/post_redux'
import FormActions from 'reducers/forms_redux'

// Helpers
import { getLanguage, numberFormat } from '../base/js/utils'
import {
  navItems,
  postItems,
  profileMenuItems,
  formText } from '../base/data/components_data'

const App = ({
  state,
  languages,
  currentLanguage,
  changeLanguage,
  likes,
  incrementLikes,
  formValues,
  changeFormValues }) => {

  /* Small helper to get the curent language, it could be placed in utils.js but when it takes
     default data is better to have it at this here to avoid redundancy on functions */
  const language = currentLanguage === 'es' ? languages.es : languages.en

  return (

    <div>
      { /* Managin erros as floating dialogs */
        formValues.errors.length > 0 &&
        formValues.errors.map(
          (error, key) => <div key={key} className="error">{error}</div> )
      }

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

        <ContactForm
          language={language}
          formValues={formValues}
          action={changeFormValues}
          formText={formText} />

      </section>

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
  formValues: state.forms.contact,
  state: state
})

const mapDispatchToProps = dispatch => ({
  // Language switch
  changeLanguage: currentLanguage => dispatch(LanguageActions.changeLanguage(currentLanguage)),

  // Post
  incrementLikes: () => dispatch(PostActions.incrementLikes()),

  // Form
  changeFormValues: (newData) => dispatch(FormActions.changeFormValues(newData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
