import React from 'react'
import PropTypes from 'prop-types';
import { switchLanguages, languagesName } from '../../base/js/utils'
import ReactSVG from 'react-svg';
import FormInput from './form_input'

const ContactForm = ({ language, formValues, action }) => {
  const { singleContact, contacts, subject, message, saveCopy, isEmail, errors } = formValues

  console.log("errors", errors)

  const onChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    action({ ...formValues[name] = value })

    target.type === 'email'
      && singleContact.length > 4
      && validateEmail() ? action({ ...formValues.isEmail = "success" }) : false
  }

  const validateEmail = () => {
    if (!singleContact) {
      action({ ...formValues.errors.push("añadir por lo menos un correo") })
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(singleContact)) {
      action({ ...formValues.errors.push("añadir correo valido") })
    } else {
      action({ ...formValues.errors = [] })
      return true
    }
  }

  const addEmail = (event) => {
    event.preventDefault()
    if (validateEmail()) {
      action({ ...formValues.contacts.push(singleContact) })
      action({ ...formValues.singleContact = '' })
      action({ ...formValues.isEmail = "success" })
    }
    action({ ...formValues.isEmail = "default" })
  }

  const addTags = () =>
    contacts.map(
      (contact, key) =>
        <div className="form__tag" key={key}>{contact}</div>
    )

  const onSubmit = (event) => {
    event.preventDefault()
    if (subject && message && contacts.length > 0) {
      event.target.parentElement.parentElement.submit();
    } else {
      action({ ...formValues.errors.push("verifica los campos e intenta de nuevo") })
    }
  }

  return (
    <form
      className="form big-card"
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

      { /* Input used to set email main subject */}
      <FormInput
        name="_subject"
        type="hidden"
        extraClass="hide"
        value={subject}
      />

      { /* Sets the after submit langage */}
      <FormInput
        name="_language"
        type="hidden"
        extraClass="hide"
        value={language}
      />

      { /* Fake field to add and validate single email */ }
      <FormInput
        label="contacts"
        name="singleContact"
        type="email"
        placeholder="add up to two contacts"
        value={singleContact}
        onChange={onChange}
      >
        {/* All emails will render as tags in this container  */}
        <div className="form__tag-container" id="tagcont">
          {contacts.length > 0 && addTags()}
        </div>
      </FormInput>
      <button className="add-contact" onClick={addEmail} >
        <ReactSVG
          path="./public/images/icons/+.svg"
          style={{ width: 40, height: 40 }}
          className={isEmail}
        />
      </button>
      <FormInput
        name="contacts"
        type="hidden"
        extraClass="hide"
        value={contacts}
      />
      <FormInput
        name="subject"
        type="text"
        placeholder="you can add a subject"
        value={subject}
        onChange={onChange}
      />
      <FormInput
        type="textarea"
        name="message"
        placeholder="leave your message here"
        value={message}
        onChange={onChange} />
      <div className="form__bottom">
        <FormInput
          name="saveCopy"
          type="checkbox"
          value={saveCopy}
          onChange={onChange}
          extraClass="checkbox" />
        <button className="form__submit" onClick={onSubmit} type="submit">
          <div className="triangle-wrapper">
            <span className="triangle-right"></span>
          </div>
          <span className="text">send mail</span>
        </button>
      </div>
    </form>
  )
}


ContactForm.propTypes = {
  formValues: PropTypes.object
}

export default ContactForm
