import calm from "../calm-tools";
import skate from "skatejs";

import "./calm-page";
import "./calm-selection";

export default skate("calm-pages", {
	properties: {
		selected: skate.properties.string({
			attribute: true,
			set(el) {
				el.$["selection"].selected = el.selected;
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
