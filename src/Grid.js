import React, { Component } from 'react';
import Skier from './Skier';
import Tree from './Tree';

export default class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			row: 1,
			column: 1,
			moveRow: 0,
			moveColumn: 0,
			treeCoords: [ [ Math.floor(Math.random() * 30) + 1, Math.floor(Math.random() * 30) + 1 ] ],
			direction: 'ArrowRight'
		};
	}

	componentDidMount = () => {
		document.addEventListener('keydown', this.keyListener);
		this.intervalID = window.setInterval(this.gameLoop, 100);
		this.generateTrees();
	};

	gameLoop = () => {
		this.move();
	};

	keyListener = (event) => {
		switch (event.key) {
			case 'ArrowLeft':
				this.setState({ moveColumn: -1, moveRow: 1, nextDirection: 'left' });
				break;
			case 'ArrowRight':
				this.setState({ moveColumn: 1, moveRow: 1, nextDirection: 'right' });
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
	};

	move = () => {
		this.setState({ row: this.state.row + this.state.moveRow, column: this.state.column + this.state.moveColumn });
	};

	generateTrees = () => {
		console.log(this.state.treeCoords);
		let newRow = Math.floor(Math.random() * 30) + 1;
		let newCol = Math.floor(Math.random() * 30) + 1;
		let treeArray = [ [ newRow, newCol ] ];
		this.setState({ treeCoords: [ newRow, newCol ] });
		for (let i = 0; i < 15; i++) {
			newRow = Math.floor(Math.random() * 30) + 1;
			newCol = Math.floor(Math.random() * 30) + 1;
			treeArray.push([ newRow, newCol ]);
		}
		this.setState({ treeCoords: treeArray });
		console.log(treeArray);
		console.log(this.state.treeCoords);
	};

	render() {
		return (
			<div className="grid">
				<Skier row={this.state.row} column={this.state.column} />
				{this.state.treeCoords.map((tree) => {
					return <Tree row={tree[0]} col={tree[1]} />;
				})}
			</div>
		);
	}
}
