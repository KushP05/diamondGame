import React from 'react';
import PropTypes from 'prop-types';

class Tile extends React.Component {

  constructor() {
    super();
    this.updateTileStatus = this.updateTileStatus.bind(this);
  }

  updateTileStatus(event) {
    event.stopPropagation();
    if(event.currentTarget.className === 'question') {
      this.props.setTileStatus(event.currentTarget.id);
    }
  }
  render() {
    return (
      <td className={ this.props.className || 'question' } onClick={ this.updateTileStatus } id={ this.props.id }>
      </td>
    )
  }
}

Tile.propTypes= {
  className: PropTypes.string,
  id: PropTypes.number.isRequired
}

export default Tile;
