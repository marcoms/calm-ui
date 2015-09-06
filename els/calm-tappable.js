import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-tappable", {
	properties: {
		darkbg: {
			attr: true,
			type: Boolean,
		},

		active: {
			attr: true,
			type: Boolean,
		},
	},

	template: calm.shadowDom(`
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

	created() {
		function activate(evt) {
			this.active = true;
		}

		function deactivate(evt) {
			this.active = undefined;
		}

		this.addEventListener("mousedown", activate);
		this.addEventListener("mouseup", deactivate);
		this.addEventListener("mouseleave", deactivate);

		if("ontouchstart" in document) {
			this.addEventListener("touchstart", activate);
			this.addEventListener("touchcancel", deactivate);
			this.addEventListener("touchend", deactivate);
		}

	},
});
