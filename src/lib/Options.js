const retroFontName = "pixel-retro";
const retroFont = (size) => `${size}px ${retroFontName}`;

const theme = {
	palette: {
		outter: "#7E7E7D",
		inner: "#FAD0C9",
	},
	font: {
		retroFont,
	},
};

const shape = {
	stage: {
		stageWidth: 285,
		stageHeight: 500,
		stageColor: theme.palette.outter,
		outLineWidth: 2,
		scoreBoardHeight: 40,
		bigFont: retroFont(11),
		smallFont: retroFont(8),
		fontColor: theme.palette.inner,
	},
	user: {
		fontColor: theme.palette.inner,
		fontBig: retroFont(8),
		fontSmall: retroFont(7),
		speedPos: 11,
		speedDir: 3.7,
	},
	brick: {
		height: 18,
		between: 18,
		color: theme.palette.outter,
		fontColor: theme.palette.inner,
		font: retroFont(7),
	},
	bullet: {
		radius: 3,
		color: theme.palette.outter,
		speed: 1,
	},
};

const options = {
	theme,
	shape,
};

export default options;
