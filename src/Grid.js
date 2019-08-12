import React, { Component } from 'react';
import Skier from './Skier';

export default class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			row: 1,
			column: 1,
			moveRow: 0,
			moveColumn: 0,
			fruitCoords: [ 1, 1 ],
			direction: 'ArrowRight'
		};
	}

	keyListener = (event) => {
		switch (event.key) {
			case 'ArrowLeft':
				if (this.state.direction === 'right') {
					break;
				}
				this.setState({ moveColumn: -1, moveRow: 0, nextDirection: 'left' });
				break;
			case 'ArrowRight':
				if (this.state.direction === 'left') {
					break;
				}
				this.setState({ moveColumn: 1, moveRow: 0, nextDirection: 'right' });
				break;
			case 'ArrowDown':
				if (this.state.direction === 'up') {
					break;
				}
				this.setState({ moveColumn: 0, moveRow: 1, nextDirection: 'down' });
				break;
			case 'ArrowUp':
				if (this.state.direction === 'down') {
					break;
				}
				this.setState({ moveColumn: 0, moveRow: -1, nextDirection: 'up' });
				break;
		}
		console.log(this.state.direction);
	};

	render() {
		return (
			<div className="grid">
				<Skier row={this.state.row} column={this.state.column} />
			</div>
		);
	}
}
