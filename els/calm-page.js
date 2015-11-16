import calm from "../calm-tools";
import skate from "skatejs";

export default skate("calm-page", {
	properties: {
		selected: skate.properties.boolean({
			attribute: true,
		}),

		name: skate.properties.string({
			attribute: true,
		}),
	},

	render: calm.shadowDom(`
		<style>
			:host(:not([selected])) {
				display: none !important;
			}
		</style>

		<content></content>
	`),

	ready(el) {
		el._selectionReady = true;
		calm.emit(el, "selectionready");
	},
});
