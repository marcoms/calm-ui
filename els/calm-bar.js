import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-card.js";

export default skate("calm-bar", {
	properties: {
		sticky: skate.properties.boolean({
			attribute: true,
		}),

		flat: skate.properties.boolean({
			attribute: true,
			set(el, {newValue: flat}) {
				el.$["bar"].z = (flat ? 0 : 1);
			},
		}),
	},

	render: calm.shadowDom(`
		<style>
			:host {
				display: block;
				width: 100%;
				height: ${calm.increment};

				background: ${calm.colors.primary};
			}

			#bar {
				display: flex;
				width: 100%;
				height: ${calm.increment};

				border-radius: 0;
				background: inherit;
				align-items: center;
				overflow: hidden;
				-webkit-user-select: none;
				-moz-user-select: none;
				-o-user-select: none;
				-ms-user-select: none;
			}

			::content > header {
				margin-left: 16px;

				font-size: 20px;
			}

			/*:host([sticky]) #bar {
				position: fixed;
				top: 0;
				z-index: 97;
			}*/

			/* TODO: add auto-raising attribute */
			:host([flat]) #bar {
				overflow: visible;
			}
		</style>

		<calm-card z="1" id="bar">
			<content></content>
		</calm-card>
	`),
});
