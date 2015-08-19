import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-page.js";
import "els/calm-selection.js";

export default skate("calm-pages", {
	properties: {
		selected: {
			attr: true,
			set(name) {
				this.$["selection"].selected = name;
			},
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: block;
			}
		</style>

		<calm-selection id="selection">
			<content select="calm-page"></content>
		</calm-selection>
	`),

	created() {
		this.$["selection"].addEventListener("select", (evt) => {
			calm.emit(this, "select", { detail: evt.detail });
		});
	}
});
