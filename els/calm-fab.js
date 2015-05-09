import calm from "calm-tools";
import skate from "skatejs";
import CalmIconBtn from "els/calm-icon-btn";

export default skate("calm-fab", {
	attributes: {
		icon: {
			updated(el, diff) {
				el.setIcon(diff.newValue);
			}
		}
	},

	prototype: {
		setIcon(icon) {
			this.shadowRoot.getElementById("btn").setIcon(icon);
		}
	},

	created(el) {
		calm.init(el, `
			<style>
				:host {
					display: block;
					border-radius: 50%;
					width: 64px;
					height: 64px;
					background: ${calm.color};
					box-shadow: ${calm.shadow[2]};
					fill: #fff;
				}
			</style>

			<calm-icon-btn id="btn"></calm-icon-btn>
		`);

		if(el.icon) el.setIcon(el.icon);
	}
})
