import calm from "calm-tools.js";
import skate from "skatejs";

import CalmIcon from "els/calm-icon.js";
import CalmTappable from "els/calm-tappable.js";

export default skate("calm-icon-btn", {
	properties: {
		icon: {
			attr: true,
			set(icon) {
				calm.ready(() => {
					this._icon.icon = icon;
				});
			},
		},

		darkbg: {
			attr: true,
			set(value) {
				calm.ready(() => {
					this._btn.darkbg = value;
				});
			},
		},

		_btn: {},
		_icon: {},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: inline-block;
				width: 64px;
				height: 64px;

				border-radius: 50%;
			}

			:host-context(calm-bar) #btn {
				margin: 0 -4px;
			}

			#btn {
				height: 100%;
				width: 100%;
				justify-content: center;

				border: 0;

				outline: 0;
				background: transparent;
				box-shadow: none;
				border-radius: 50%;
			}
		</style>

		<calm-tappable id="btn"><calm-icon id="icon"></calm-icon></calm-tappable>
	`),

	created() {
		this._btn = this.shadowRoot.getElementById("btn");
		this._icon = this.shadowRoot.getElementById("icon");
	}
});
