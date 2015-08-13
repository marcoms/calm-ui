import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-page", {
	properties: {
		selected: {
			attr: true,
		},

		name: {
			attr: true,
		},
	},

	template: calm.shadowDom(`
		<style>
			:host(:not([selected])) {
				display: none;
			}
		</style>

		<content></content>
	`),
});
