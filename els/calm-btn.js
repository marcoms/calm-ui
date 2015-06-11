import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-btn", {
	attributes: {
		flat: {},
		darkbg: {},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: inline-flex;
				align-items: stretch;

				background: #fff;
				color: #212121;
			}

			:host([flat]) { background: transparent; }
			:host([flat]) #btn { box-shadow: none; }
			:host([flat]) #btn.active { background: rgba(0, 0, 0, 0.1); }
			:host([flat][darkbg]) { color: #fff; }
			:host([flat][darkbg]) #btn.active { background: rgba(255, 255, 255, 0.25); }

			#btn {
				border: 0;
				padding: 14px 24px;

				box-shadow: ${calm.shadow[1]};
				border-radius: 2px;
				outline: 0;
				background: inherit;
				text-transform: uppercase;
				font: inherit;
				color: inherit;

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
