import options from "../Options";
import Brick from "./Brick";

export default class BrickGroup {
	constructor() {
		this.rowSize = 0;
		this.colSize = 0;
		this.durability = 0;
		this.bricks = [];
	}

	clear() {
		this.bricks = [];
	}

	setSize(row, col) {
		this.rowSize = row;
		this.colSize = col;
	}

	setDurability(durability) {
		this.durability = Math.max(0, durability);
	}

	create() {
		// options
		const { stage, brick } = options.shape;
		const { stageWidth, scoreBoardHeight: startY } = stage;
		const { height, between } = brick;

		const width = (stageWidth - (this.colSize + 1) * between) / this.colSize;

		this.bricks = new Array(this.rowSize).fill(0).map((_, rowIdx) =>
			new Array(this.colSize).fill(0).map((_, colIdx) => {
				const brick = new Brick(
					(colIdx + 1) * between + colIdx * width, // x
					startY + (rowIdx + 1) * between + rowIdx * height, // y
					width, // width
					this.durability, // durabliity
					[rowIdx, colIdx] // index
				);
				return brick;
			})
		);
	}

	getAliveCount() {
		let aliveCount = 0;

		this.___forEach((brick) => {
			if (brick.isAlive === true) {
				aliveCount++;
			}
		});

		return aliveCount;
	}

	draw(ctx) {
		this.___forEach((brick) => brick.draw(ctx));
	}

	___forEach(callback) {
		for (let rowIdx = 0; rowIdx < this.bricks.length; rowIdx++) {
			for (let colIdx = 0; colIdx < this.bricks[rowIdx].length; colIdx++) {
				callback(this.bricks[rowIdx][colIdx], rowIdx, colIdx);
			}
		}
	}
}
