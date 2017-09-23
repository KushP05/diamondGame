import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import Tile from '../src/Tile';

describe('Array', function() {
  describe('#indexOf()', function() {
    const props = {
		className: 'diamond',
    id: 1
	};
    it('should render markup with props passed from parent', function() {
      const wrapper = shallow(<Tile { ...props } />);
      const td = wrapper.find('td');
		  expect(td.length).to.equal(1);
      expect(td.prop('className')).to.equal(props.className);
      expect(td.prop('id')).to.equal(props.id);
    });

    it('should call getTileStatus property on a click', () => {
      const setTileStatus = sinon.stub();
      const wrapper = shallow(<Tile { ...props } setTileStatus={ setTileStatus } />);
      const fakeEvent = { stopPropagation: sinon.stub(), currentTarget: { className: 'question'} };
      wrapper.find('td').simulate('click', fakeEvent);
      expect(setTileStatus.calledOnce).to.be.true;
    });

    it('should not call getTileStatus property on a click given the className is not question', () => {
      const setTileStatus = sinon.stub();
      const wrapper = shallow(<Tile { ...props } setTileStatus={ setTileStatus } />);
      const fakeEvent = { stopPropagation: sinon.stub(), currentTarget: { className: 'diamond'} };
      wrapper.find('td').simulate('click', fakeEvent);
      expect(setTileStatus.calledOnce).to.be.false;
    });

    it('should set question as defult className', () => {
      const wrapper = shallow(<Tile id={ 1 }/>);
      expect(wrapper.find('td').prop('className')).to.equal('question');
    });
  });
});
