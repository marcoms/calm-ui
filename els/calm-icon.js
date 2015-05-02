import calm from "calm-tools";
import skate from "skatejs";
import CalmIcons from "els/calm-icons";

export default skate("calm-icon", {
	attributes: {
		icon: {
			updated(el, diff) {
				el.setIcon(diff.newValue);

			}
		}
	},

	prototype: {
		setIcon(icon) {
			let newIcon = document.getElementsByTagName("calm-icons")[0].getIcon(icon);
			let svg = this.shadowRoot.getElementById("icon");
			svg.replaceChild(newIcon, svg.getElementsByTagName("g")[0]);
		}
	},

	created(el) {
		calm.init(el, `
			<style>
				svg {
					vertical-align: middle;
				}
			</style>

			<svg id="icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<g></g>
			</svg>
		`);

		if(el.icon) el.setIcon(el.icon);
	}
});
