import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-btn", {
	template: calm.shadowDOM(`
		<style>
			:host {
				display: inline-block;
				background: #fff;
				color: #212121;
			}

			#btn {
				text-transform: uppercase;
				font: inherit;
				color: inherit;

				border: 0;
				padding: 12px 24px;

				box-shadow: ${calm.shadow[1]};
				border-radius: 2px;
				outline: 0;
				background: inherit;

				-webkit-user-select: none;
				-webkit-tap-highlight-color: transparent;
				cursor: pointer;
				transition: background ${calm.time.short} linear;
			}

			#btn.active {
				background: rgb(90%, 90%, 90%);
				transition: none;
			}
		</style>

		<button data-handle-active id="btn"><content></content></button>
	`),

	created(el) {
		calm.handleActive(el.shadowRoot.getElementById("btn"));
	},
});
