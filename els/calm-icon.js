import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-icons.js";

export default skate("calm-icon", {
	properties: {
		icon: {
			attr: true,
			set(icon) {
				if(!window.calmIcons) window.calmIcons = document.createElement("calm-icons");
				this._frame.replaceChild(window.calmIcons.getIcon(icon), this._frame.children[0]);
			},
		},

		_frame: {},
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

	created() {
		this._frame = this.shadowRoot.getElementById("frame");
	},
});
