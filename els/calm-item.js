import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-tappable";

export default skate("calm-item", {
	properties: {
		name: skate.properties.string({
			attribute: true,
		}),

		selected: skate.properties.boolean({
			attribute: true,
		}),
	},

	render: calm.shadowDom(`
		<style>
			:host {
				display: block;
			}

			#item {
				padding: 0 16px;
				height: 48px;
			}

			::content > calm-icon {
				margin-right: 32px;
			}

			:host([selected]) #item {
				background: rgba(0, 0, 0, 0.1);

			}
		</style>

		<calm-tappable id="item"><content></content></calm-tappable>
	`),

	ready(el) {
		el._selectionReady = true;
		calm.emit(el, "selectionready");
	},
});
