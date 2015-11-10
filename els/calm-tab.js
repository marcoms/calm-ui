import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-tappable.js";

export default skate("calm-tab", {
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
				display: flex;

				align-items: stretch;
				text-transform: uppercase;
				white-space: nowrap;
			}

			#tab {
				justify-content: center;

				padding: 0 16px;
				width: 100%;
			}

			::content * {
				pointer-events: none;
			}
		</style>

		<calm-tappable id="tab"><content></content></calm-tappable>
	`),

	ready(el) {
		el._selectionReady = true;
		calm.emit(el, "selectionready");
	},
});
