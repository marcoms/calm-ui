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
				font-size: 112px;
				font-weight: 300;
			}

			:host([type="display3"]) {
				font-size: 56px;
			}

			:host([type="display2"]) {
				font-size: 45px;
			}

			:host([type="display1"]) {
				font-size: 34px;
			}

			:host([type="headline"]) {
				font-size: 24px;
			}

			:host([type="title"]) {
				font-size: 20px;
				font-weight: 500;
			}

			:host([type="subheading"]) {
				font-size: 16px;
			}

			:host([type="subheader"]) {
				/* (48 - 14) / 2 */
				padding: 7px 16px;

				font-weight: 500;
				font-size: 14px;
			}

			:host([type="body2"]) {
				font-size: 14px;
				font-weight: 500;
			}

			:host([type="body1"]) {
				font-size: 14px;
			}

			:host([type="caption"]) {
				font-size: 12px;
			}

			:host([type="button"]) {
				font-size: 14px;
				font-weight: 500;
				text-transform: uppercase;
			}
		</style>

		<content></content>
	`),
});
