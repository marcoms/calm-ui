import calm from "calm-tools.js";
import skate from "skatejs";

import CalmIconBtn from "els/calm-icon-btn.js";

export default skate("calm-fab", {
	properties: {
		icon: {
			attr: true,
			set(icon) {
				calm.ready(() => {
					this._btn.icon = icon;
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
	},

	template: calm.shadowDom(`
		<style>
			:host {
				z-index: 97;

				display: block;
				width: 64px;
				height: 64px;

				border-radius: 50%;
				background: ${calm.color};
				box-shadow: ${calm.shadow[2]};
				fill: #fff;
			}
		</style>

		<calm-icon-btn id="btn"></calm-icon-btn>
	`),

	created() {
		this._btn = this.shadowRoot.getElementById("btn");
	}
});
