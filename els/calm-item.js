import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-tappable.js";

export default skate("calm-item", {
	properties: {
		name: {
			attr: true,
		},

		selected: {
			attr: true,
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: block;
			}

			#item {
				padding: 0 16px;
				height: 48px;
			}

			::content > calm-icon {
				margin-right: 16px;
			}

			:host([selected]) #item {
				background: rgba(0, 0, 0, 0.1);
			}
		</style>

		<calm-tappable id="item"><content></content></calm-tappable>
	`),
});
