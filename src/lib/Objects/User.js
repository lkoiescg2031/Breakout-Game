import options from "../Options";
import { toFormatString } from "../util/string";

export default class User {
	constructor() {
		this.maxScore = 0;
	}

	setScore(score = 0) {
		this.score = score;
		this.maxScore = Math.max(this.maxScore, this.score);
	}

	setAbility(ballSize, bounce) {
		this.ballSize = ballSize;
		this.bounce = bounce;
	}

	addAbility(ballSize, bounce) {
		this.setAbility(this.ballSize + ballSize, this.bounce + bounce);
	}

	draw(ctx) {
		const { scoreBoardHeight: y, stageWidth } = options.shape.stage;
		const { fontSmall, fontBig, fontColor } = options.shape.user;
		const maxTextWidth = stageWidth / 3 - 10;

		const ballsStr = `balls ${toFormatString(this.ballSize)}`;
		const bounceStr = `bounce ${toFormatString(this.bounce)}`;

		const scorePad = 9;
		const maxScoreStr = this.maxScore.toString().padStart(scorePad, "0");
		const scoreStr = this.score.toString().padStart(scorePad, "0");

		//draw ball counts
		ctx.beginPath();
		ctx.font = fontSmall;
		ctx.fillStyle = fontColor;
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";
		ctx.fillText(ballsStr, 8, y / 2 - 3, maxTextWidth);
		ctx.closePath();

		//draw bounce count
		ctx.beginPath();
		ctx.font = fontBig;
		ctx.fillStyle = fontColor;
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";
		ctx.fillText(bounceStr, 8, y - 8, maxTextWidth);
		ctx.closePath();

		//draw max score
		ctx.beginPath();
		ctx.font = fontSmall;
		ctx.fillStyle = fontColor;
		ctx.textAlign = "right";
		ctx.textBaseline = "bottom";
		ctx.fillText(maxScoreStr, stageWidth - 8, y / 2 - 3, maxTextWidth);
		ctx.closePath();

		//draw score
		ctx.beginPath();
		ctx.font = fontBig;
		ctx.fillStyle = fontColor;
		ctx.textAlign = "right";
		ctx.textBaseline = "bottom";
		ctx.fillText(scoreStr, stageWidth - 8, y - 8, maxTextWidth);
		ctx.closePath();
	}
}
