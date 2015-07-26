import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-tappable", {
	properties: {
		darkbg: { attr: true },
		active: { attr: true },
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: flex;
				align-items: center;

				background: transparent;

				cursor: pointer;
				transition: background ${calm.time.short} linear;
				-webkit-tap-highlight-color: transparent;
			}

			:host([active]) {
				background: rgba(0, 0, 0, 0.1) !important;
				outline: none;

				transition: none;
			}

			:host([darkbg][active]) {
				background: rgba(255, 255, 255, 0.25) !important;
			}
		</style>

		<content></content>
	`),

	created() {
		function activate() {
			this.active = "";
			this.dispatchEvent(new Event("activate"));
		}

		function deactivate() {
			this.active = undefined;
			this.dispatchEvent(new Event("deactivate"));
		}

		this.addEventListener("mousedown", activate);
		this.addEventListener("touchstart", activate);
		this.addEventListener("touchcancel", deactivate);
		this.addEventListener("mouseleave", deactivate);
		this.addEventListener("mouseup", deactivate);
		this.addEventListener("touchend", deactivate);

	},
});
