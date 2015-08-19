import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-card.js";
import "els/calm-tappable.js";

export default skate("calm-btn", {
	properties: {
		flat: {
			attr: true,
			set(value) {
				this.$["card"].z = (value !== undefined ? 0 : 1);
			},
		},

		darkbg: {
			attr: true,
			set(value) {
				this.$["btn"].darkbg = (value === "" ? "" : undefined);
			},
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: inline-flex;
				align-items: stretch;

				background: #fff;
				color: #212121;
				border-radius: ${calm.borderRadius};
			}

			#card {
				background: inherit;
				overflow: hidden;
			}

			#btn {
				padding: 14px 24px;

				text-transform: uppercase;

				cursor: pointer;
			}

			:host([flat]) {
				background: transparent;
			}

			:host([darkbg]) {
				color: #fff;
			}
		</style>

		<calm-card z="1" id="card">
			<calm-tappable id="btn"><content></content></calm-tappable>
		</calm-card>
	`),
});
