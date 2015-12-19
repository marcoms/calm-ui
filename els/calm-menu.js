import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-item";
import "./calm-selection";

export default skate("calm-menu", {
	properties: {
		selected: skate.properties.string({
			attribute: true,
			set(el, {newValue: selected}) {
				if (el.noselect) return;
				el.$["selection"].selected = selected;
			},
		}),

		noselect: skate.properties.boolean({
			attribute: true,
			set(el, {newValue: noselect}) {
				if (noselect) {
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

			:host-context(calm-drawer:not([right]):not([bottom])) ::content [selected]{
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
