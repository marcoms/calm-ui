import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-page.js";
import "els/calm-selection.js";

export default skate("calm-pages", {
	properties: {
		selected: calm.properties.string({
			attribute: true,
			set(el, {newValue: selected}) {
				el.$["selection"].selected = selected;
			},
		}),
	},

	render: calm.shadowDom(`
		<style>
			:host {
				display: block;
			}
		</style>

		<calm-selection id="selection">
			<content select="calm-page"></content>
		</calm-selection>
	`),

	ready(el) {
		el.$["selection"].addEventListener("select", (evt) => {
			calm.emit(el, "select", {detail: evt.detail});
		});
	},
});
