import calm from "../calm-tools";
import skate from "skatejs";

export default skate("calm-text", {
	properties: {
		type: skate.properties.string({
			attribute: true,
		}),
	},

	render: calm.shadowDom(`
		<style>
			:host {
				display: block;
			}

			:host([type="display4"]) {
				color: rgba(0, 0, 0, 0.54);
				font-size: 112px;
				font-weight: 300;
			}

			:host([darkbg][type="display4"]) {
				color: rgba(255, 255, 255, 0.54);
			}

			:host([type="display3"]) {
				color: rgba(0, 0, 0, 0.54);
				font-size: 56px;
			}

			:host([darkbg][type="display3"]) {
				color: rgba(255, 255, 255, 0.54);
			}

			:host([type="display2"]) {
				color: rgba(0, 0, 0, 0.54);
				font-size: 45px;
			}

			:host([darkbg][type="display2"]) {
				color: rgba(255, 255, 255, 0.54);
			}

			:host([type="display1"]) {
				color: rgba(0, 0, 0, 0.54);
				font-size: 34px;
			}

			:host([darkbg][type="display1"]) {
				color: rgba(255, 255, 255, 0.54);
			}

			:host([type="headline"]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 24px;
			}

			:host([darkbg][type="headline"]) {
				color: rgba(255, 255, 255, 0.87);
			}

			:host([type="title"]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 20px;
				font-weight: 500;
			}

			:host([darkbg][type="title"]) {
				color: rgba(255, 255, 255, 0.87);
			}

			:host([type="subheading"]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 16px;
			}

			:host([darkbg][type="subheading"]) {
				color: rgba(255, 255, 255, 0.87);
			}

			:host([type="subheader"]) {
				/* (48 - 14) / 2 */
				padding: 7px 16px;

				color: rgba(0, 0, 0, 0.54);
				font-weight: 500;
				font-size: 14px;
			}

			:host([darkbg][type="subheader"]) {
				color: rgba(255, 255, 255, 0.54);
			}

			:host([type="body2"]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 14px;
				font-weight: 500;
			}

			:host([darkbg][type="body2"]) {
				color: rgba(255, 255, 255, 0.87);
			}

			:host([type="body1"]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 14px;
			}

			:host([darkbg][type="body1"]) {
				color: rgba(255, 255, 255, 0.87);
			}

			:host([type="caption"]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 12px;
			}

			:host([darkbg][type="caption"]) {
				color: rgba(255, 255, 255, 0.87);
			}

			:host([type="button"]) {
				color: rgba(0, 0, 0, 0.87);
				font-size: 14px;
				font-weight: 500;
				text-transform: uppercase;
			}

			:host([darkbg][type="button"]) {
				color: rgba(255, 255, 255, 0.87);
			}
		</style>

		<content></content>
	`),
});
