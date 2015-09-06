import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-card.js";
import "els/calm-icon-btn.js";

export default skate("calm-fab", {
	properties: {
		icon: {
			attr: true,
			type: calm.propType(String),
			set(icon) {
				this.$["btn"].icon = icon;
			},
		},

		darkbg: {
			attr: true,
			type: Boolean,
			set(value) {
				this.$["btn"].darkbg = value;
			},
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				z-index: 97;

				display: block;

				border-radius: 50%;
				background: ${calm.color};
				fill: #fff;
			}

			#card {
				width: 64px;
				height: 64px;

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
