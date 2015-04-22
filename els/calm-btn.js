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
					color: #fff;
					border-radius: 4px;
					border: 0;
					outline: 0;
					background: rgb(160, 160, 160);
					padding: 12px 24px;
					-webkit-user-select: none;
					-webkit-tap-highlight-color: transparent;
					cursor: pointer;
					transition: opacity 240ms linear;
				}

				#btn.active {
					transition: none;
					opacity: 0.4;
				}
			</style>

			<button id="btn" class="handle-active"><content></content></button>
		`);

		calm.handleActive(el);
	}
});
