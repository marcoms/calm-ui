import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-tappable", {
	properties: {
		darkbg: calm.properties.boolean({
			attribute: true,
		}),

		active: calm.properties.boolean({
			attribute: true,
		}),
	},

	render: calm.shadowDom(`
		<style>
			:host {
				display: flex;
				align-items: center;

				background: transparent;
				outline: none;

				cursor: pointer;
				transition: background ${calm.durations.short} linear;
				-webkit-tap-highlight-color: transparent;
			}

			:host([active]) {
				background: rgba(0, 0, 0, 0.1) !important;

				transition: none;
			}

			:host([darkbg][active]) {
				background: rgba(255, 255, 255, 0.25) !important;
			}
		</style>

		<content></content>
	`),

	ready(el) {
		function activate(evt) {
			el.active = true;
		}

		function deactivate(evt) {
			el.active = false;
		}

		el.addEventListener("mousedown", activate);
		el.addEventListener("mouseup", deactivate);
		el.addEventListener("mouseleave", deactivate);

		if ("ontouchstart" in document) {
			el.addEventListener("touchstart", activate);
			el.addEventListener("touchcancel", deactivate);
			el.addEventListener("touchend", deactivate);
		}
	},
});
