import Vector2D from "../util/Math/Vector2D";
import options from "../Options";

export default class Bullet {
	constructor(x, y, dir, initialBunce, index) {
		this.curPos = new Vector2D(x, y);
		this.prevPos = new Vector2D(x, y);
		this.setMove(dir);

		this.bounce = initialBunce;
		this.isAlive = this.bounce >= 0;

		this.index = index;
	}

	// 총알 위치 값을 (x,y) 로 설정
	setPos(x, y) {
		this.curPos.x = x;
		this.curPos.y = y;
	}

	// 운동량 변경
	setMove(x, y) {
		const degree = x;

		if (typeof y === "undefined") {
			const { speed, radius } = options.shape.bullet;
			this.move = Vector2D.createByPolorCoord(speed * 2 * radius, degree);
		} else {
			this.move = new Vector2D(x, y);
		}
	}

	//damage 만큼 바운스 횟수 감소
	attacked(damaged) {
		this.bounce = Math.max(-1, this.bounce - damaged);
		this.isAlive = this.bounce >= 0;
	}

	// 총알을 move 만큼 이동함
	updatePos() {
		if (this.isAlive === false) {
			return;
		}

		const { x, y } = this.curPos;

		// 이전 위치 설정
		this.prevPos.x = x;
		this.prevPos.y = y;

		// 현제 위치 설정
		this.setPos(
			x + this.move.x, // x
			y + this.move.y // y
		);
	}

	//현재 총알을 시각화 함
	draw(ctx) {
		if (this.isAlive === false) {
			return;
		}

		const { color, radius } = options.shape.bullet;

		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(this.curPos.x, this.curPos.y, radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
	}
}
