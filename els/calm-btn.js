import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-card.js";
import "els/calm-tappable.js";

export default skate("calm-btn", {
	properties: {
		flat: {
			attr: true,
			type: Boolean,
			set(value) {
				this.$["card"].z = (value ? 0 : 1);
			},
		},

		darkbg: {
			attr: true,
			type: Boolean,
			set(value) {
				this.$["btn"].darkbg = value;
			},
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: inline-flex;

				background: #fff;
				color: #212121;
				border-radius: ${calm.borderRadius};
			}

			#card {
				display: flex;

				overflow: hidden;

				border-radius: inherit;
				background: inherit;
			}

			#btn {
				padding: 10px 8px;

				line-height: 1em;
				text-transform: uppercase;
			}

			:host([flat]) {
				background: transparent;
				color: ${calm.colors.neutral};
			}

			:host(:not([flat])[darkbg]) {
				color: #fff;
			}

			:host-context(calm-toast) #btn {
				padding: 10px 24px;
			}
		</style>

		<calm-card z="1" id="card">
			<calm-tappable id="btn"><content></content></calm-tappable>
		</calm-card>
	`),
});
