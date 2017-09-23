import React from 'react';
import Tile from './Tile';


class TileBoard extends React.Component {
  constructor() {
    super();
    this.diamondPositions = []
    while(this.diamondPositions.length <= 8){
        var randomnumber = Math.ceil(Math.random()*64)
        if(this.diamondPositions.indexOf(randomnumber) > -1) continue;
        this.diamondPositions[this.diamondPositions.length] = randomnumber;
    }
    this.setTileStatus = this.setTileStatus.bind(this);
    this.checkWhichArrow = this.checkWhichArrow.bind(this);
    this.currentArrowPos = null;
    this.state = {
      diamondPositions: this.diamondPositions,
      diamondsFound: 0,
      score: 0,
      currentArrowPos: null,
    };
  }
  setTileStatus(id) {
    const status = this.state.diamondPositions.includes(parseInt(id)) ? ('pokeball') : this.checkWhichArrow(id);
    const diamondsFound = status === 'pokeball' ? this.state.diamondsFound+1 : this.state.diamondsFound;
    if(this.state.currentArrowPos) {
      const score = this.state.score+1;
      this.setState({ [this.state.currentArrowPos]: 'blank', score });

    }
    if(status !== 'pokeball') {
      this.setState({
        currentArrowPos: id
      });
    }
    this.setState({ [id]: status, diamondsFound });
  }
  checkWhichArrow(id) {
    let x1 = Math.ceil(id/8);
    let y1 = id%8;
    let leastXValue;
    let leastYValue;
    let x2;
    let y2;
    let maxDistance = 12;
    for(let i=0;i<this.state.diamondPositions.length;i++){
      x2 = Math.ceil(this.state.diamondPositions[i]/8)
      y2 = this.state.diamondPositions[i]%8;
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
    const tilesColumns = [...Array(64).keys()].map((e) => (<Tile className ={ this.state[e] } id={ e } setTileStatus={ this.setTileStatus }/>));
    const tilesRows=[];
    for(var i=0;i<8;i++){
      var rowElement = tilesColumns.slice(i*8, (i+1)*8);
      tilesRows.push(<tr>{ rowElement }</tr>);
    }
    return (
      <div>
        { this.state.diamondsFound === 8 ?
          <h1> GAME OVER ! YOUR SCORE IS { 64 - this.state.score } </h1>
          :
          <table>
            <tbody>
              { tilesRows }
            </tbody>
          </table>
        }
      </div>
    )
  }
}

export default TileBoard;
