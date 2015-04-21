import calm from "calm-tools";
import skate from "skatejs";

let tmpl = `
	<style>
		#btn {
			font: inherit;
			color: #fff;
			border-radius: 4px;
			border: 0;
			outline: 0;
			background: rgb(160, 160, 160);
			height: 42px;
			padding: 0 24px;
			line-height: 36px;
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

	<button class="handle-active" id="btn"><content></content></button>
`;

export default skate("calm-btn", {
	created(el) {
		calm.init(el, tmpl);
		calm.handleActive(el);
	}
});
