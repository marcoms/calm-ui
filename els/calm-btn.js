import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-btn", {
	created(el) {
		calm.init(el, `
			<style>
				:host {
					display: inline-block;
				}

				#btn {
					font: inherit;
					color: #212121;
					border: 0;
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
					border-radius: 2px;
					outline: 0;
					background: #fff;
					padding: 12px 24px;
					-webkit-user-select: none;
					-webkit-tap-highlight-color: transparent;
					cursor: pointer;
					transition: background 160ms linear;
					will-change: background;
				}

				#btn.active {
					transition: none;
					background: #eee;
				}
			</style>

			<button id="btn" class="handle-active"><content></content></button>
		`);

		calm.handleActive(el);
	}
});
