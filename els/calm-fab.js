import calm from "calm-tools";
import skate from "skatejs";
import CalmIconBtn from "els/calm-icon-btn";

export default skate("calm-fab", {
	attributes: {
		icon: {
			created(el, diff) {
				el.setIcon(diff.newValue);
			},

			updated(el, diff) {
				el.setIcon(diff.newValue);
			},
		},
	},

	prototype: {
		setIcon(icon) {
			this.shadowRoot.getElementById("btn").setIcon(icon);
		},
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
});
