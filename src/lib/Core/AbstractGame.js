import options from "../Options";

export default class AbstractStageGame {
	constructor() {
		this.___runner = this.___runner.bind(this);
	}

	onCreated(context) {
		this.context = context;
		this.requestAnimationFrameId = 0;

		this.gameState = "initialize";
	}

	onInitialized(t) {
		throw new Error("Not Implementation onInitialized Method");
	}
	onReady(t) {
		throw new Error("Not Implementation onReady Method");
	}
	onPrepareStage(t) {
		throw new Error("Not Implementation onPrepareStage Method");
	}
	onRunStage(t) {
		throw new Error("Not Implementation onRunStage Method");
	}

	onUpdateView(t) {
		const { stageWidth, stageHeight } = options.shape.stage;
		this.context.clearRect(0, 0, stageWidth, stageHeight);
	}

	runGame() {
		this.requestAnimationFrameId = window.requestAnimationFrame(this.___runner);
	}

	exit() {
		window.cancelAnimationFrame(this.requestAnimationFrameId);
	}

	___runner(t) {
		this.onUpdateData(t);
		this.onUpdateView(t);

		this.requestAnimationFrameId = window.requestAnimationFrame(this.___runner);
	}

	onUpdateData(t) {
		switch (this.gameState) {
			default:
			case "initialize":
				this.gameState = this.onInitialized(t);
				return;
			case "ready":
				this.gameState = this.onReady(t);
				return;
			case "prepareStage":
				this.gameState = this.onPrepareStage(t);
				return;
			case "runStage":
				this.gameState = this.onRunStage(t);
				return;
		}
	}
}
