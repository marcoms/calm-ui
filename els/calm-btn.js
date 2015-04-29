import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-btn", {
	created(el) {
		calm.init(el, `
			<style>
				:host {
					display: inline-flex;
					flex-direction: column;

					background: #fff;
					color: #212121;
				}

				#btn {
					flex: 1;

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
					transition: none;
					background: #eee;
				}

				/* .btn-bar */

				:host(.btn-bar) {
					background: transparent;
					color: inherit;
				}

				:host(.btn-bar) #btn {
					height: 100%;
					box-shadow: none;
					border-radius: 0;
					padding: 0 16px;
				}

				:host(.btn-bar) #btn.active {
					background: rgba(255, 255, 255, 0.25);
				}
			</style>

			<button id="btn" class="handle-active"><content></content></button>
		`);

		calm.handleActive(el);
	}
});
