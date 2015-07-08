import calm from "calm-tools.js";
import skate from "skatejs";

import CalmTappable from "els/calm-tappable.js";

export default skate("calm-btn", {
	properties: {
		flat: { attr: true },
		darkbg: {
			attr: true,
			set(value) {
				calm.ready(() => {
					if(value === "") {
						this._btn.darkbg = "";
					} else {
						this._btn.darkbg = undefined;
					}
				});
			},
		},

		_btn: {},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: inline-flex;
				align-items: stretch;

				background: #fff;
				color: #212121;
				border-radius: 2px;
			}

			#btn {
				justify-content: center;
				border: 0;
				padding: 14px 24px;
				width: 100%;

				background: inherit;
				box-shadow: ${calm.shadow[1]};
				border-radius: inherit;
				outline: 0;
				text-transform: uppercase;
				font: inherit;
				color: inherit;

				cursor: pointer;
			}

			:host([flat]) { background: transparent; }
			:host([flat]) #btn { box-shadow: none; }
			:host([darkbg]) { color: #fff; }
		</style>

		<calm-tappable id="btn"><content></content></calm-tappable>
	`),

	created() {
		this._btn = this.shadowRoot.getElementById("btn");
	},
});
