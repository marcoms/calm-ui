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
			if(!this.iconProvider) this.findIconProvider();

			let newIcon = this.iconProvider.getIcon(icon);
			let svg = this.shadowRoot.getElementById("icon");
			svg.replaceChild(newIcon, svg.getElementsByTagName("g")[0]);
		},

		findIconProvider() {
			let documentIconProvider = document.getElementsByTagName("calm-icons")[0];
			if(documentIconProvider) {
				this.iconProvider = documentIconProvider;
			} else {
				if(!window.calmIcons) window.calmIcons = document.createElement("calm-icons");
				this.iconProvider = window.calmIcons;
			}
		}
	},

	created(el) {
		calm.init(el, `
			<style>
				:host {
					display: inline-block;
				}

				svg {
					vertical-align: middle;
				}
			</style>

			<svg id="icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<g></g>
			</svg>
		`);

		el.findIconProvider();

		if(el.icon) {
			el.setIcon(el.icon);
		}
	}
});
