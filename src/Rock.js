import React, { Component } from 'react';

export default class Tree extends Component {
	render() {
		return <div className="rock" style={{ gridArea: `${this.props.row} / ${this.props.col} / span 1 / span 1` }} />;
	}
}
