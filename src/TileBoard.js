import React from 'react';
import Tile from './Tile';


class TileBoard extends React.Component {
  constructor() {
    super();
    this.diamondPositions = [1,2,3,4,5,6,7,8];
  }

  render() {
    const tilesColumns = [...Array(64).keys()].map((e) => (<Tile/>));
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
