import React, { PropTypes } from 'react'

/* As requested in the test all images should come from the api,
	but I think it could be an overload of assets I'm talking about 20 request per page...
*/
const PokemonDisplay = ({ name, action }) =>
  <a className="col__container" href="#" role="button" onClick={action}>
    <img
      className='col__img'
      src={`./public/images/pokemon/${name || 'unknown'}.png`} />
    <p className="col__text">{name}</p>
  </a>


PokemonDisplay.propTypes = {
  name: PropTypes.string,
  action: PropTypes.func
}

export default PokemonDisplay