import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-text", {
	properties: {
		darkbg: {
			attr: true,
			type: Boolean,
		},

		display4: {
			attr: true,
			type: Boolean,
		},

		display3: {
			attr: true,
			type: Boolean,
		},

		display2: {
			attr: true,
			type: Boolean,
		},

		display1: {
			attr: true,
			type: Boolean,
		},

		headline: {
			attr: true,
			type: Boolean,
		},

		title: {
			attr: true,
			type: Boolean,
		},

		subheading: {
			attr: true,
			type: Boolean,
		},

		body2: {
			attr: true,
			type: Boolean,
		},

		body1: {
			attr: true,
			type: Boolean,
		},

		caption: {
			attr: true,
			type: Boolean,
		},

		button: {
			attr: true,
			type: Boolean,
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: inline;
			}

			:host([display4]) {
				color: rgba(0, 0, 0, 0.54);
				font-size: 112px;
				font-weight: 300;
			}

			:host([darkbg][display4]) {
				color: rgba(255, 255, 255, 0.54);
			}

			:host([display3]) {
				color: rgba(0, 0, 0, 0.54);
				font-size: 56px;
			}

			:host([darkbg][display3]) {
				color: rgba(255, 255, 255, 0.54);
			}

			:host([display2]) {
				color: rgba(0, 0, 0, 0.54);
				font-size: 45px;
			}

			:host([darkbg][display2]) {
				color: rgba(255, 255, 255, 0.54);
			}

			:host([display1]) {
				color: rgba(0, 0, 0, 0.54);
				font-size: 34px;
			}

			:host([darkbg][display1]) {
				color: rgba(255, 255, 255, 0.54);
			}

			:host([headline]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 24px;
			}

			:host([darkbg][headline]) {
				color: rgba(255, 255, 255, 0.87);
			}

			:host([title]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 20px;
				font-weight: 500;
			}

			:host([darkbg][title]) {
				color: rgba(255, 255, 255, 0.87);
			}

			:host([subheading]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 16px;
			}

			:host([darkbg][subheading]) {
				color: rgba(255, 255, 255, 0.87);
			}

			:host([body2]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 14px;
				font-weight: 500;
			}

			:host([darkbg][body2]) {
				color: rgba(255, 255, 255, 0.87);
			}

			:host([body1]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 14px;
			}

			:host([darkbg][body1]) {
				color: rgba(255, 255, 255, 0.87);
			}

			:host([caption]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 12px;
			}

			:host([darkbg][caption]) {
				color: rgba(255, 255, 255, 0.87);
			}

			:host([button]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 14px;
				font-weight: 500;
				text-transform: uppercase;
			}

			:host([darkbg][button]) {
				color: rgba(255, 255, 255, 0.87);
			}
		</style>

		<content></content>
	`),
});
