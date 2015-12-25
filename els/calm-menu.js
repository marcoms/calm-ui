import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-item";
import "./calm-selection";

export default skate("calm-menu", {
	properties: {
		selected: skate.properties.string({
			attribute: true,
			set(el) {
				if (el.noselect) return;
				el.$["selection"].selected = el.selected;
			},
		}),

		noselect: skate.properties.boolean({
			attribute: true,
			set(el) {
				if (el.noselect) {
					el.$["selection"].tapselect = false;
					el.selected = undefined;
				} else {
					el.$["selection"].tapselect = true;
				}
			},
		}),
	},

	render: calm.shadowDom(`
		<style>
			:host {
				display: block;
				padding: 8px 0;
			}

			:host-context(calm-drawer:not([right])) ::content [selected]{
				color: ${calm.colors.primary};
				fill: ${calm.colors.primary};
			}
		</style>

		<calm-selection tapselect id="selection">
			<content></content>
		</calm-selection>
	`),

	ready(el) {
		el.$["selection"].addEventListener("select", (evt) => {
			el.selected = evt.detail.selected;
			calm.emit(el, "select", {detail: evt.detail});
		});
	},
});
