import React from 'react'
import PropTypes from 'prop-types';
import { getLanguage } from '../../base/js/utils'
import ReactSVG from 'react-svg';
import FormInput from './form_input'

const ContactForm = ({ language, formValues, action, formText }) => {

  const { singleContact, contacts, subject, message, saveCopy, isEmail, errors } = formValues

  const onChange = event => {

    // This function starts when typing contact's input
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    // Updates reducer form values according to the input's name and value
    action({ ...formValues[name] = value })

    /* Since I wanted to give an extra functionality to the "plus" image this
      validation updates it's style */
    target.type === 'email'
      && singleContact.length > 4
      && validateEmail() ? action({ ...formValues.isEmail = "success" }) : false

  }

  const validateEmail = () => {

    // Validates email if it mateches this simple regex
    // if this doesn't match adds an error to the reducer, else clears them
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(singleContact)) {
      action({
        ...formValues.errors.push(formText.emailError) })
    } else {
      action({ ...formValues.errors = [] })
      return true
    }

  }

  const addEmail = (event) => {

    /* Prevents ddefalt send email behaviour and adds contact to the contacts array,
      clears the input value and adds an style to the ad email button or "plus image" */
    event.preventDefault()
    if (validateEmail()) {
      action({ ...formValues.contacts.push(singleContact) })
      action({ ...formValues.singleContact = '' })
      action({ ...formValues.isEmail = "success" })
    }
    action({ ...formValues.isEmail = "default" })

  }

  const addTags = () =>

    // This funcionality adds emails as "tags" in the contacts field
    contacts.map(
      (contact, key) =>
        <div className="form__tag" key={key}>{contact}</div>
    )

  const onSubmit = (event) => {

    /* Checks the precense of the inputs if it is true it will send the email,
       else an error will display */
    event.preventDefault()
    if (subject && message && contacts.length > 0) {
      event.target.parentElement.parentElement.submit();
    } else {
      action({ ...formValues.errors.push(formText.formError) })
    }
  }

  { /* for this ecercise I'm using formspree wich is a nice tool to send emails
    via fronEnd */ }
  return (
    <form
      className="form"
      action="https://formspree.io/punkeneto1@gmail.com"
      method="POST"
      autoComplete="nope" >
      { /* autocomplete="nope"? the browser will keep suggesting autocompletion
        values even if the autocomplete attribute is set to off, The trick to
        really forcing the no-autocompletion is to assign a random string */ }

      { /* This input will be used y to send the email to multiple destinataries */ }
      <FormInput
        name="_cc"
        type="hidden"
        extraClass="hide"
        value={contacts}
      />

      { /* Input used to set email main subject */ }
      <FormInput
        name="_subject"
        type="hidden"
        extraClass="hide"
        value={subject}
      />

      { /* Sets the after submit langage */ }
      <FormInput
        name="_language"
        type="hidden"
        extraClass="hide"
        value={language}
      />

      { /* Fake field to add and validate single email */ }
      <FormInput
        label={getLanguage(language, formText.contactsLabel)}
        name="singleContact"
        type="email"
        placeholder={getLanguage(language, formText.contactsPlaceholder)}
        value={singleContact}
        onChange={onChange}
      >
        {/* All emails will render as tags in this container  */}
        <div className="form__tag-container" id="tagcont">
          {contacts.length > 0 && addTags()}
        </div>
      </FormInput>

      { /* This button validates that the correct email is been added */ }
      <button className="add-contact" onClick={addEmail} >
        <ReactSVG
          path="./public/images/icons/+.svg"
          style={{ width: 40, height: 40 }}
          className={isEmail}
        />
      </button>

      { /* This field sends an email copy to ever single added contact */ }
      <FormInput
        name={formText.contactsLabel}
        type="hidden"
        extraClass="hide"
        value={contacts}
      />

      <FormInput
        label={getLanguage(language, formText.subjectLabel)}
        name={formText.subjectLabel}
        type="text"
        placeholder={getLanguage(language, formText.subjectPlaceholder)}
        value={subject}
        onChange={onChange}
      />

      <FormInput
        label={getLanguage(language, formText.messageLabel)}
        type="textarea"
        name={formText.messageLabel}
        placeholder={getLanguage(language, formText.messagePlaceholder)}
        value={message}
        onChange={onChange} />

      <div className="form__bottom">
        <FormInput
          label={getLanguage(language, formText.saveCopy)}
          name={formText.saveCopy}
          type="checkbox"
          value={saveCopy}
          onChange={onChange}
          extraClass="checkbox" />
        <button className="form__submit" onClick={onSubmit} type="submit">
          <div className="triangle-wrapper">
            <span className="triangle-right"></span>
          </div>
          <span className="text">{getLanguage(language, formText.sendMail)}</span>
        </button>
      </div>
    </form>
  )
}


ContactForm.propTypes = {
  language: PropTypes.object,
  formValues: PropTypes.object,
  formText: PropTypes.object,
  action: PropTypes.func
}

export default ContactForm
