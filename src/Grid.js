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
			direction: 'ArrowRight',
			speed: 8,
			speedMultiplier: 1
		};
	}

	componentDidMount = () => {
		document.addEventListener('keydown', this.keyListener);
		this.intervalID = window.setInterval(this.gameLoop, 200);
	};

	gameLoop = () => {
		this.move();
	};

	keyListener = (event) => {
		switch (event.key) {
			case 'ArrowLeft':
				this.setState({ moveColumn: -1, moveRow: 0, nextDirection: 'left' });
				break;
			case 'ArrowRight':
				this.setState({ moveColumn: 1, moveRow: 0, nextDirection: 'right' });
				break;
			case 'ArrowDown':
				if (this.state.direction === 'up') {
					break;
				}
				this.setState({ moveColumn: 0, moveRow: 1, nextDirection: 'down' });
				break;
			case 'ArrowUp':
				this.setState({ moveColumn: 0, moveRow: -1, nextDirection: 'up' });
				break;
		}
		console.log(this.state.direction);
	};

	move = () => {
		this.setState({ row: this.state.row + this.state.moveRow, column: this.state.column + this.state.moveColumn });
	};

	render() {
		return (
			<div className="grid">
				<Skier row={this.state.row} column={this.state.column} />
			</div>
		);
	}
}
