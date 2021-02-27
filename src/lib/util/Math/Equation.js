// ax^2 + bx+c 의 모든 실근을 크기 순서대로 반환
export function quadraticEquation(a, b, c) {
	const d = b * b - 4 * a * c;
	//해가 없는 경우
	if (d < -Number.EPSILON) return [];
	// 중근
	if (d < Number.EPSILON) return [-b / (2 * a)];
	// 두 실근
	return [-b - Math.sqrt(d) / (2 * a), -b + Math.sqrt(d) / (2 * a)];
}
