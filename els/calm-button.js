import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-card";
import "./calm-tappable";

export default skate("calm-button", {
	properties: {
		flat: skate.properties.boolean({
			attribute: true,
			set(el) {
				el.$["card"].z = (el.flat ? 0 : 1);
			},
		}),

		darkbg: skate.properties.boolean({
			attribute: true,
			set(el) {
				el.$["button"].darkbg = el.darkbg;
				el.$["text"].darkbg = el.darkbg;
			},
		}),
	},

	render: calm.shadowDom(`
		<style>
			:host {
				display: inline-flex;

				background: #fff;
				color: #212121;
				border-radius: ${calm.sizes.borderRadius};
			}

			#card {
				display: flex;

				overflow: hidden;

				border-radius: inherit;
				background: inherit;
			}

			#button {
				padding: 10px 8px;

				line-height: 1em;
				text-transform: uppercase;
				-webkit-user-select: none;
				-moz-user-select: none;
				-o-user-select: none;
				-ms-user-select: none;
			}

			:host([flat]) {
				background: transparent;
			}

			:host([flat]) #text {
				color: ${calm.colors.neutral};
			}

			:host(:not([flat])[darkbg]) {
				color: #fff;
			}

			:host-context(calm-toast) #button {
				padding: 10px 24px;
			}
		</style>

		<calm-card z="1" id="card">
			<calm-tappable id="button">
				<calm-text type="button" id="text">
					<content></content>
				</calm-text>
			</calm-tappable>
		</calm-card>
	`),
});
