import calm from "calm-tools.js";
import skate from "skatejs";

import CalmTappable from "els/calm-tappable.js";

export default skate("calm-tab", {
	properties: {
		name: { attr: true },
		selected: { attr: true },
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: flex;
				align-items: stretch;
				text-transform: uppercase;
			}

			#tab {
				justify-content: center;

				padding: 0 16px;
				width: 100%;
			}
		</style>

		<calm-tappable id="tab"><content></content></calm-tappable>
	`),
});
