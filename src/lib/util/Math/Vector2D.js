import { fmod } from "./Number";

export default class Vector2D {
	static createByPolorCoord(radius, theta) {
		const dx = radius * Math.cos((theta * Math.PI) / 180);
		const dy = radius * Math.sin((theta * Math.PI) / 180);

		return new Vector2D(dx, dy);
	}

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	//compare Func
	equalTo(rhs) {
		return rhs.x === this.x && rhs.y === this.y;
	}

	ltTo(rhs) {
		if (rhs.x === this.x) {
			return this.y < rhs.y;
		}
		return this.x < rhs.x;
	}

	// 사칙 연산
	add(rhs) {
		const ret = rhs.clone();
		ret.x += this.x;
		ret.y += this.y;

		return ret;
	}

	sub(rhs) {
		const ret = this.clone();
		ret.x -= rhs.x;
		ret.y -= rhs.y;
		return ret;
	}

	mul(rhs) {
		return new Vector2D(this.x * rhs, this.y * rhs);
	}

	norm() {
		return Math.hypot(this.x, this.y);
	}

	normalize() {
		const norm = this.norm();
		return new Vector2D(this.x / norm, this.y / norm);
	}

	// x 축 양의 방향으로 부터 이 백터까지 반시계 방향으로 잰 각도
	polar() {
		return fmod(Math.atan2(this.y, this.x) + 2 * Math.PI, 2 * Math.PI);
	}

	//외적, 내적
	dot(rhs) {
		return this.x * rhs.x + this.y * rhs.y;
	}

	cross(rhs) {
		return this.x * rhs.y - rhs.x * this.y;
	}

	// 이 백터를 rhs 에 투영한 결과
	project(rhs) {
		const r = rhs.normalize();
		return r.mul(r.dot(this));
	}

	clone() {
		return new Vector2D(this.x, this.y);
	}
}
