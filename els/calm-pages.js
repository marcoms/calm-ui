import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-pages", {
	attributes: {
		selected: {
			created(el, diff) { el.setSelected(diff.newValue); },
			updated(el, diff) { el.setSelected(diff.newValue); },
		}
	},

	prototype: {
		setSelected(selected) {
			const prevSelected = this.querySelector("[data-selected]");
			if(prevSelected) prevSelected.removeAttribute("data-selected");
			document.getElementById(selected).dataset.selected = "";
		},
	},

	template: calm.shadowDom(`
		<style>
			:host { display: block; }
			::content > div { display: none; }
			::content > div[data-selected] { display: initial; }
		</style>

		<content select="div"></content>
	`),
});
