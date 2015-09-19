import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-card.js";

export default skate("calm-bar", {
	properties: {
		sticky: {
			attr: true,
			type: Boolean,
		},

		flat: {
			attr: true,
			type: Boolean,
			set(value) {
				this.$["bar"].z = (value ? 0 : 1);
			},
		},
	},

	template: calm.shadowDom(`
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
