import React, { Component } from 'react';
import Skier from './Skier';
import Tree from './Tree';
import Rock from './Rock';

export default class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			y: 1,
			x: 1,
			moveY: 0,
			moveX: 0,
			treeCoords: [ [ 19, 19 ] ],
			rockCoords: [ [ 2, 5 ] ],
			direction: null
		};
	}

	componentDidMount = () => {
		document.addEventListener('keydown', this.keyListener);
		this.intervalID = window.setInterval(this.gameLoop, 200);
		this.generateTrees();
		this.generateRocks();
	};

	gameLoop = () => {
		this.move();
	};

	keyListener = (event) => {
		switch (event.key) {
			case 'ArrowLeft':
				this.setState({ moveX: -1, moveY: 1, direction: 'left' });
				break;
			case 'ArrowRight':
				this.setState({ moveX: 1, moveY: 1, direction: 'right' });
				break;
			case 'ArrowDown':
				if (this.state.direction === 'up') {
					break;
				}
				this.setState({ moveX: 0, moveY: 1, direction: 'down' });
				break;
			case 'ArrowUp':
				this.setState({ moveX: 0, moveY: -1, direction: 'up' });
				break;
		}
	};

	move = () => {
		//MOVE TREES
		let newtreearray = [];
		this.state.treeCoords.map((tree) => {
			let treeCopy = [ tree[0], tree[1] ];
			if (this.state.direction === 'left') {
				// newtreearray.push([ tree[0] + 1, tree[1] + 1 ]);
				treeCopy[0] += 1;
				treeCopy[1] += 1;
			} else if (this.state.direction === 'right') {
				// newtreearray.push([ tree[0] - 1, tree[1] + 1 ]);
				treeCopy[0] -= 1;
				treeCopy[1] += 1;
			} else if (this.state.direction === 'down') {
				treeCopy[0] -= 1;
			}
			newtreearray.push(treeCopy);
		});
		//END MOVE TREES
		//MOVE ROCKS
		let newrockarray = [];
		this.state.rockCoords.map((rock) => {
			let rockCopy = [ rock[0], rock[1] ];
			if (this.state.direction === 'left') {
				// newrockarray.push([ rock[0] + 1, rock[1] + 1 ]);
				rockCopy[0] += 1;
				rockCopy[1] += 1;
			} else if (this.state.direction === 'right') {
				// newrockarray.push([ rock[0] - 1, rock[1] + 1 ]);
				rockCopy[0] -= 1;
				rockCopy[1] += 1;
			} else if (this.state.direction === 'down') {
				rockCopy[0] -= 1;
			}
			newrockarray.push(rockCopy);
		});
		//END MOVE ROCKS

		this.setState({
			treeCoords: newtreearray,
			rockCoords: newrockarray,
			y: this.state.y + this.state.moveY,
			x: this.state.x + this.state.moveX
		});
	};

	generateTrees = () => {
		let treeArray = [];
		for (let i = 0; i < 15; i++) {
			let newRow = Math.floor(Math.random() * 50) + 1;
			let newCol = Math.floor(Math.random() * 50) + 1;
			console.log('tree', newRow, newCol);
			treeArray.push([ newRow, newCol ]);
		}
		this.setState({ treeCoords: treeArray });
	};

	generateRocks = () => {
		let newRow = Math.floor(Math.random() * 50) + 1;
		let newCol = Math.floor(Math.random() * 50) + 1;
		let rockArray = [ [ newRow, newCol ] ];
		this.setState({ rockCoords: [ newRow, newCol ] });
		for (let i = 0; i < 15; i++) {
			newRow = Math.floor(Math.random() * 50) + 1;
			newCol = Math.floor(Math.random() * 50) + 1;
			console.log('rock', newRow, newCol);
			rockArray.push([ newRow, newCol ]);
		}
		this.setState({ rockCoords: rockArray });
		console.log(this.state.rockCoords, this.state.treeCoords);
	};

	render() {
		return (
			<div className="grid">
				<Skier row={this.state.y} column={this.state.x} />
				{this.state.treeCoords.map((tree, index) => {
					return <Tree row={tree[0]} col={tree[1]} key={index} />;
				})}
				{this.state.rockCoords.map((rock) => {
					return <Rock row={rock[0]} col={rock[1]} />;
				})}
			</div>
		);
	}
}
