import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-toast", {
	attributes: {
		duration: { value: "3200", },
	},

	prototype: {
		show() {
			this.classList.add("toast-visible");
			window.setTimeout(() => { this.hide(); }, Number.parseInt(this.duration, 10));
		},

		hide() {
			this.classList.remove("toast-visible");
		},

		toggle() {
			this.classList.toggle("toast-visible");
			if(this.pendingHide !== undefined) {
				window.clearTimeout(this.pendingHide);
				this.pendingHide = undefined;
			}

			if(this.classList.contains("toast-visible")) {
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

				box-sizing: border-box;
				width: 100%;
				padding: 14px 24px;
				margin: 0 0 0 0;

				color: #fff;
				background: #323232;

				transform: none;
				transition: transform ${calm.time.med} ${calm.ease.out};
			}

			:host(.toast-visible) {
				transform: translateY(-100%);
			}
		</style>

		<content></content>
	`),
})
