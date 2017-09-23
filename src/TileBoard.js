import React from 'react';
import Tile from './Tile';


class TileBoard extends React.Component {
  constructor() {
    super();
    this.diamondPositions = [2,5,7,32,54,63,21,44];
    this.setTileStatus = this.setTileStatus.bind(this);
    this.checkWhichArrow = this.checkWhichArrow.bind(this);
  }
  setTileStatus(id) {
    return this.diamondPositions.includes(parseInt(id)) ? ('pokeball') : this.checkWhichArrow(id);
  }
  checkWhichArrow(id) {
    let x1 = Math.ceil(id/8);
    let y1 = id%8;
    let leastXValue;
    let leastYValue;
    let x2;
    let y2;
    let maxDistance = 12;
    for(let i=0;i<this.diamondPositions.length;i++){
      x2 = Math.ceil(this.diamondPositions[i]/8)
      y2 = this.diamondPositions[i]%8;
      let temp = (Math.sqrt(Math.pow(Math.abs(x1-x2),2)+Math.pow(Math.abs(y1-y2),2)));
      if(temp<maxDistance) {
        maxDistance = temp;
        leastXValue = x2;
        leastYValue = y2;
      }
    }
    if(Math.abs(leastXValue-x1)<=Math.abs(leastYValue-y1)){
      return (leastYValue-y1) > 0 ? 'rightArrow' : 'leftArrow';
    }
    return (leastXValue-x1) > 0 ? 'downArrow': 'upArrow';
  }
  render() {
    const tilesColumns = [...Array(64).keys()].map((e) => (<Tile id={ e } setTileStatus={ this.setTileStatus }/>));
    const tilesRows=[];
    for(var i=0;i<8;i++){
      var rowElement = tilesColumns.slice(i*8, (i+1)*8);
      tilesRows.push(<tr>{ rowElement }</tr>);
    }
    return (
      <div>
          <table>
            <tbody>
              { tilesRows }
            </tbody>
          </table>
      </div>
    )
  }
}

export default TileBoard;
