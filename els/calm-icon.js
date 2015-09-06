import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-icons.js";

export default skate("calm-icon", {
	properties: {
		icon: {
			attr: true,
			type: calm.propType(String),
			set(icon) {
				if(!window.calmIcons) window.calmIcons = document.createElement("calm-icons");
				this.$["frame"].replaceChild(window.calmIcons.getIcon(icon), this.$["frame"].children[0]);
			},
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: inline-block;
			}

			svg {
				vertical-align: middle;
			}
		</style>

		<svg id="frame" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<g></g>
		</svg>
	`),
});
