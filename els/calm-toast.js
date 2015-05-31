import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-toast", {
	attributes: {
		state: { value: "hidden", },
		duration: { value: "3200", },
	},

	prototype: {
		show() {
			this.state = "visible";
			window.setTimeout(() => { this.hide(); }, Number.parseInt(this.duration, 10));
		},

		hide() {
			this.state = "hidden";
		},

		toggle() {
			this.state = (this.sate === "visible" ? "hidden": "visible");
			if(this.pendingHide !== undefined) {
				window.clearTimeout(this.pendingHide);
				this.pendingHide = undefined;
			}

			if(this.state === "visible") {
				this.pendingHide = window.setTimeout(() => { this.hide(); }, Number.parseInt(this.duration, 10));
			}
		},
	},

	template: calm.shadowDOM(`
		<style>
			:host {
				position: fixed;
				top: 100%;
				left: 0;
				z-index: 99;

				box-sizing: border-box;
				width: 100%;
				padding: 14px 24px;
				margin: 0 0 0 0;

				color: #fff;
				background: #323232;

				transform: none;
				transition: transform ${calm.time.med} ${calm.ease.out};
			}

			:host([state=visible]) {
				transform: translateY(-100%);
			}
		</style>

		<content></content>
	`),
})
