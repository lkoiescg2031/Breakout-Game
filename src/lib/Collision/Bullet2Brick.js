import options from "../Options";

// math
import Vector2D from "../util/Math/Vector2D";
import {
	segmentIntersectsWithPoint,
	hitCircleTime,
	isPointInBox,
	getReflectCircle,
} from "../util/Math/Geometry";

function isHitCorner(prevPos, curPos, dir, center, circleDir, radius) {
	const hitTime = hitCircleTime(prevPos, dir, center, radius);

	//다음 이동전에 충돌 하지 않은 경우
	if (hitTime - 1 > Number.EPSILON) {
		return { isHit: false };
	}

	// point = prevPos + dir * hitTime
	const point = prevPos.add(dir.mul(hitTime));
	// point 가 center와 circleDir 이 이루는 사분 원에 있는 지 확인
	if (isPointInBox(point, center, circleDir)) {
		return { isHit: true, point: point };
	} else {
		return { isHit: false };
	}
}

// FIXME 블럭 터널링 현상 발생
export default function Bullet2Brick(bullet, brick, user) {
	const { radius, speed } = options.shape.bullet;
	const { height } = options.shape.brick;

	const perPoint = 10;
	const damage = 1;

	//out line
	const brickTopY = brick.pos.y;
	const brickBottomY = brick.pos.y + height;
	const brickLeftX = brick.pos.x;
	const brickRightX = brick.pos.x + brick.width;

	//collision line
	const collisionOutLineTopY = brickTopY - radius;
	const collisionOutLineBottomY = brickBottomY + radius;
	const collisionOutLineLeftX = brickLeftX - radius;
	const collisionOutLineRightX = brickRightX + radius;

	// bullet pos
	const prevPos = bullet.prevPos.clone();
	const curPos = bullet.curPos.clone();
	const move = bullet.move.clone();

	const isCrossing = (a, b) =>
		segmentIntersectsWithPoint(prevPos, curPos, a, b);

	const isCrossingCorner = (center, radius, circleDir) =>
		isHitCorner(prevPos, curPos, move, center, circleDir, radius);

	//top right corner
	const topRightCorner = new Vector2D(brickRightX, brickTopY);
	const topRightHit = isCrossingCorner(
		topRightCorner,
		radius,
		new Vector2D(collisionOutLineRightX, collisionOutLineTopY)
	);
	if (topRightHit.isHit) {
		//총알 충돌 처리
		const reflect = getReflectCircle(
			move,
			topRightCorner,
			topRightHit.point
		).mul(2 * radius * speed);
		bullet.setMove(reflect.x, reflect.y);
		bullet.setPos(topRightHit.point.x, topRightHit.point.y);
		//블럭 충돌 처리
		brick.attacked(damage);
		//유저 점수 획득
		user.setScore(user.score + perPoint);
		return true;
	}
	//top left corner
	const topLeftCorner = new Vector2D(brickLeftX, brickTopY);
	const topLeftHit = isCrossingCorner(
		topLeftCorner,
		radius,
		new Vector2D(collisionOutLineLeftX, collisionOutLineTopY)
	);
	if (topLeftHit.isHit) {
		//총알 충돌 처리
		const reflect = getReflectCircle(move, topLeftCorner, topLeftHit.point).mul(
			2 * radius * speed
		);
		bullet.setMove(reflect.x, reflect.y);
		bullet.setPos(topLeftHit.point.x, topLeftHit.point.y);
		//블럭 충돌 처리
		brick.attacked(damage);
		//유저 점수 획득
		user.setScore(user.score + perPoint);
		return true;
	}

	//bottom right corner
	const bottomRightCorner = new Vector2D(brickRightX, brickBottomY);
	const bottomRightHit = isCrossingCorner(
		bottomRightCorner,
		radius,
		new Vector2D(collisionOutLineRightX, collisionOutLineBottomY)
	);
	if (bottomRightHit.isHit) {
		// 총알 충돌 처리
		const reflect = getReflectCircle(
			move,
			bottomRightCorner,
			bottomRightHit.point
		).mul(2 * radius * speed);
		bullet.setMove(reflect.x, reflect.y);
		bullet.setPos(bottomRightHit.point.x, bottomRightHit.point.y);
		// 블럭 충돌 처리
		brick.attacked(damage);
		// 유저 점수 획득
		user.setScore(user.score + perPoint);
		return true;
	}

	//bottom left corner
	const bottomLeftCorner = new Vector2D(brickLeftX, brickBottomY);
	const bottomLeftHit = isCrossingCorner(
		bottomLeftCorner,
		radius,
		new Vector2D(collisionOutLineLeftX, collisionOutLineBottomY)
	);
	if (bottomLeftHit.isHit) {
		// 총알 충돌 처리
		const reflect = getReflectCircle(
			move,
			bottomLeftCorner,
			bottomLeftHit.point
		).mul(2 * radius * speed);
		bullet.setMove(reflect.x, reflect.y);
		bullet.setPos(bottomLeftHit.point.x, bottomLeftHit.point.y);
		// 블럭 충돌 처리
		brick.attacked(damage);
		// 사용자 점수 획득
		user.setScore(user.score + perPoint);
		return true;
	}

	//블럭 상단 충돌
	const topCrossing = isCrossing(
		new Vector2D(brickLeftX, collisionOutLineTopY),
		new Vector2D(brickRightX, collisionOutLineTopY)
	);
	if (bullet.move.y > 0 && topCrossing.isIntersect) {
		//총알 충돌처리
		bullet.setPos(topCrossing.point.x, topCrossing.point.y);
		bullet.setMove(bullet.move.x, bullet.move.y * -1);
		//블럭 충돌 처리
		brick.attacked(damage);
		//유저 점수 획득
		user.setScore(user.score + perPoint);

		return true;
	}

	//블럭 하단 충돌
	const bottomCrossing = isCrossing(
		new Vector2D(brickLeftX, collisionOutLineBottomY),
		new Vector2D(brickRightX, collisionOutLineBottomY)
	);
	if (bullet.move.y < 0 && bottomCrossing.isIntersect) {
		//총알 충돌 처리
		bullet.setPos(bottomCrossing.point.x, bottomCrossing.point.y);
		bullet.setMove(bullet.move.x, bullet.move.y * -1);
		//블럭 충돌 처리
		brick.attacked(damage);
		//유저 점수 획득
		user.setScore(user.score + perPoint);
		return true;
	}

	//블럭 왼쪽 충돌
	const leftCrossing = isCrossing(
		new Vector2D(collisionOutLineLeftX, brickTopY),
		new Vector2D(collisionOutLineLeftX, brickBottomY)
	);
	if (bullet.move.x > 0 && leftCrossing.isIntersect) {
		//총알 충돌 처리
		bullet.setPos(leftCrossing.point.x, leftCrossing.point.y);
		bullet.setMove(bullet.move.x * -1, bullet.move.y);
		//블럭 충돌 처리
		brick.attacked(damage);
		//유저 점수 획득
		user.setScore(user.score + perPoint);
		return true;
	}
	// 오른쪽 충돌
	const rightCrossing = isCrossing(
		new Vector2D(collisionOutLineRightX, brickTopY),
		new Vector2D(collisionOutLineRightX, brickBottomY)
	);
	if (bullet.move.x < 0 && rightCrossing.isIntersect) {
		//총알 충돌 처리
		bullet.setPos(rightCrossing.point.x, rightCrossing.point.y);
		bullet.setMove(bullet.move.x * -1, bullet.move.y);
		//블럭 충돌처리
		brick.attacked(damage);
		//유저 점수 획득
		user.setScore(user.score + perPoint);
		return true;
	}

	// 그 외
	return false;
}
