import React, { Component } from 'react';

class Skier extends Component {
	render() {
		return (
			<div className="skier" style={{ gridArea: `${this.props.row} / ${this.props.column} / span 1 / span 1` }} />
		);
	}
}

export default Skier;
