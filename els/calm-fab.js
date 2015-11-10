import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-card.js";
import "els/calm-icon-btn.js";

export default skate("calm-fab", {
	properties: {
		icon: skate.properties.string({
			attribute: true,
			set(el, {newValue: icon}) {
				el.$["btn"].icon = icon;
			},
		}),

		darkbg: skate.properties.boolean({
			attribute: true,
			set(el, {newValue: darkbg}) {
				el.$["btn"].darkbg = darkbg;
			},
		}),
	},

	render: calm.shadowDom(`
		<style>
			:host {
				z-index: 97;

				display: block;
				width: ${calm.increment};
				height: ${calm.increment};

				border-radius: 50%;
				background: ${calm.colors.accent};
				fill: #fff;
			}

			#card {
				width: ${calm.increment};
				height: ${calm.increment};

				border-radius: 50%;
				background: inherit;
				fill: inherit;
			}
		</style>

		<calm-card z="2" id="card">
			<calm-icon-btn id="btn"></calm-icon-btn>
		</calm-card>
	`),
});
