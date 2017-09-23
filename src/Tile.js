import React from 'react';
import PropTypes from 'prop-types';

class Tile extends React.Component {

  constructor() {
    super();
    this.state={
      className: 'question'
    }
    this.updateTileStatus = this.updateTileStatus.bind(this);
  }

  updateTileStatus(event) {
    event.stopPropagation();
    if(event.currentTarget.className === 'question') {
      const getclassName = this.props.setTileStatus(event.currentTarget.id);
      this.setState({className: getclassName});
    }
  }
  render() {
    return (
      <td className={ this.state.className } onClick={ this.updateTileStatus } id={ this.props.id }>
      </td>
    )
  }
}

Tile.propTypes= {
  id: PropTypes.number.isRequired
}

export default Tile;
