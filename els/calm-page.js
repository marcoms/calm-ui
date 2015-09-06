import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-page", {
	properties: {
		selected: {
			attr: true,
			type: Boolean,
		},

		name: {
			attr: true,
			type: calm.propType(String),
		},
	},

	template: calm.shadowDom(`
		<style>
			:host(:not([selected])) {
				display: none !important;
			}
		</style>

		<content></content>
	`),
});
