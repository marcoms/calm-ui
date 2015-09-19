import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-icon.js";
import "els/calm-tappable.js";

export default skate("calm-icon-btn", {
	properties: {
		icon: {
			attr: true,
			type: calm.propType(String),
			set(icon) {
				this.$["icon"].icon = icon;
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
				display: inline-block;
				width: ${calm.increment};
				height: ${calm.increment};

				border-radius: 50%;
			}

			#btn {
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

		<calm-tappable id="btn"><calm-icon id="icon"></calm-icon></calm-tappable>
	`),
});
