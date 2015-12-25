import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-icon";
import "./calm-tappable";

export default skate("calm-icon-button", {
	properties: {
		icon: skate.properties.string({
			attribute: true,
			set(el, {newValue: icon}) {
				el.$["icon"].icon = icon;
			},
		}),

		darkbg: skate.properties.boolean({
			attribute: true,
			set(el, {newValue: darkbg}) {
				el.$["button"].darkbg = darkbg;
			},
		}),
	},

	render: calm.shadowDom(`
		<style>
			:host {
				display: inline-block;
				width: ${calm.sizes.touchTarget};
				height: ${calm.sizes.touchTarget};

				border-radius: 50%;
			}

			#button {
				height: 100%;
				width: 100%;
				justify-content: center;

				border: 0;

				outline: 0;
				background: transparent;
				box-shadow: none;
				border-radius: 50%;
			}
		</style>

		<calm-tappable id="button">
			<calm-icon id="icon"></calm-icon>
		</calm-tappable>
	`),
});
