import React from 'react'
import PropTypes from 'prop-types';
import { switchLanguages, languagesName } from '../../base/js/utils'

const LanguageSwitch = ({ action, language }) =>
    <div
    className={`switch ${language}`}
      onClick={
        () => action(switchLanguages(language))
      }>
    <span className="switch__ball"></span>
      { languagesName(language) }
    </div>

LanguageSwitch.propTypes = {
  action: PropTypes.func,
  language: PropTypes.string
}

export default LanguageSwitch
