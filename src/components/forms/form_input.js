import React from 'react'
import PropTypes from 'prop-types';

const FormInput = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  onClick,
  extraClass,
  children }) => {

  const renderRegularInput = () =>

    <input
      id={name}
      className="form__input"
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />

  const renderTextAreaInput = () =>

    <textarea
      id={name}
      className="form__textarea"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange} />

  const renderSubmitButton = () =>

    <button
      className="form__button"
      onClick={onClick}
      type={type}>
        {value}
    </button>

  const checkInputType = () => {

    switch (type) {
      case "textarea":
        return renderTextAreaInput()
      case "submit":
        return renderSubmitButton()
      default:
        return renderRegularInput()
    }
  }

  return (

    <label className={`form__label ${extraClass}`} htmlFor={name}>
      <span> { label ||  name } </span>
        { children ?
          <div className="form__tag--wrapper">
            {children}
            { checkInputType() }
          </div>
          : checkInputType() }
    </label>

  )
}


FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  extraClass: PropTypes.string
}

export default FormInput
