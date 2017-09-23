import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import TileBoard from '../src/TileBoard';

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;
global.document = document;


describe('TileBoard', function() {
  it('should render 64 tiles', () => {
    const wrapper = shallow(<TileBoard />);
    const Tile = wrapper.find('Tile');
    expect(Tile.length).to.equal(64);
  });

  it('should display message saying game is over when all diamonds are found',() => {
    const wrapper = shallow(<TileBoard />);
    wrapper.setState({
      diamondsFound: 8
    });
    const Tile = wrapper.find('Tile');
    expect(Tile.length).to.equal(0);
    const h1 = wrapper.find('h1');
    expect(h1.length).to.equal(1);
  });
  describe('Tile Status', function() {
    // body...
    it('should set status as diamond given tile contains diamond', () => {
      const wrapper = mount(<TileBoard />);
      wrapper.setState({currentArrowPos: 1, diamondPositions:[2, 15, 63, 23, 12, 34, 45, 32]});
      const Tile = wrapper.find('Tile').at(2);
      const fakeEvent = { stopPropagation: sinon.stub() };
      Tile.simulate('click', fakeEvent);
      expect(wrapper.state().diamondsFound).to.equal(1);
    });
    it('should set status as blank given tile does not contain diamond and another is selected', () => {
      const wrapper = mount(<TileBoard />);
      const Tile = wrapper.find('Tile').at(3);
      wrapper.setState({currentArrowPos: 1, diamondPositions:[2, 15, 63, 23, 12, 34, 45, 32]});
      const fakeEvent = { stopPropagation: sinon.stub() };
      Tile.simulate('click', fakeEvent);
      expect(wrapper.state([1])).to.equal('blank');
      expect(wrapper.state([3])).to.equal('leftArrow');
      expect(wrapper.state().diamondsFound).to.equal(0);
      expect(wrapper.state().currentArrowPos).to.equal('3');
    });
    it('should set status as arrow given tile does not contain diamond', () => {
      const wrapper = mount(<TileBoard />);
      wrapper.setState({diamondPositions:[2, 15, 63, 23, 12, 34, 45, 32]});
      const fakeEvent = { stopPropagation: sinon.stub() };
      const Tile1 = wrapper.find('Tile').at(1);
      Tile1.simulate('click', fakeEvent);
      expect(wrapper.state('score')).to.equal(0);
      const Tile19 = wrapper.find('Tile').at(19);
      wrapper.setState({currentArrowPos: 1});
      Tile19.simulate('click', fakeEvent);
      expect(wrapper.state([1])).to.equal('blank');
      expect(wrapper.state([19])).to.equal('rightArrow');
      expect(wrapper.state().diamondsFound).to.equal(0);
      expect(wrapper.state().currentArrowPos).to.equal('19');
      const Tile7 = wrapper.find('Tile').at(7);
      Tile7.simulate('click', fakeEvent);
      expect(wrapper.state([1])).to.equal('blank');
      expect(wrapper.state([19])).to.equal('blank');
      expect(wrapper.state([7])).to.equal('downArrow');
      const Tile31 = wrapper.find('Tile').at(31);
      Tile31.simulate('click', fakeEvent);
      expect(wrapper.state([1])).to.equal('blank');
      expect(wrapper.state([19])).to.equal('blank');
      expect(wrapper.state([7])).to.equal('blank');
      expect(wrapper.state([31])).to.equal('upArrow');
    });
  });
});
