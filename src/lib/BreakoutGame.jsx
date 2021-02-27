import React, { PureComponent } from "react";

import "./font/retroFont.css";
import "./BreakoutGame.css";

import Game from "./Core/Game";
import options from "./Options";

export default class BreakoutGame extends PureComponent {
	constructor(props) {
		super(props);

		this.game = new Game();
		this.canvasRef = React.createRef();

		this.____initContext = this.____initContext.bind(this);
	}

	____initContext() {
		const { stageWidth, stageHeight } = options.shape.stage;

		const canvas = this.canvasRef.current;
		const ctx = canvas.getContext("2d");

		//for retina
		const ratio = window.devicePixelRatio;

		canvas.width = stageWidth * ratio;
		canvas.height = stageHeight * ratio;
		ctx.scale(ratio, ratio);

		this.game.onCreated(ctx);
	}

	componentDidMount() {
		this.____initContext();
		this.game.runGame();
	}

	componentWillUnmount() {
		this.game.exit();
	}

	render() {
		return (
			<div className="breakout_wrapper">
				<canvas ref={this.canvasRef} className="breakout_view" />
			</div>
		);
	}
}
