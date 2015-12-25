import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-card";
import "./calm-icon-button";

export default skate("calm-fab", {
	properties: {
		icon: skate.properties.string({
			attribute: true,
			set(el, {newValue: icon}) {
				el.$["button"].icon = icon;
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
				z-index: 97;

				display: block;
				width: ${calm.sizes.increment};
				height: ${calm.sizes.increment};

				border-radius: 50%;
				background: ${calm.colors.accent};
				fill: #fff;
			}

			#card {
				width: ${calm.sizes.increment};
				height: ${calm.sizes.increment};

				border-radius: 50%;
				background: inherit;
				fill: inherit;
			}
		</style>

		<calm-card z="2" id="card">
			<calm-icon-button id="button"></calm-icon-button>
		</calm-card>
	`),
});
