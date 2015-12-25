import calm from "../calm-tools";
import skate from "skatejs";

export default skate("calm-selection", {
	properties: {
		selected: skate.properties.string({
			attribute: true,
			set(el) {
				if (!el.selected) return;
				el._setSelected(el.selected);
			},
		}),

		tapselect: skate.properties.boolean({
			attribute: true,
			set(el) {
				if (el.tapselect) {
					el.addEventListener("click", el._onTap);
				} else {
					el.removeEventListener("click", el._onTap);
				}
			},
		}),
	},

	prototype: {
		_setSelected(selected) {
			if (selected === this._existingSelected) return;

			const nodes = [...this.$["choices"].getDistributedNodes()];
			const choices = nodes.filter((node) => {
				return node.supportsSelection;
			});

			const notReady = choices.filter((choice) => {
				return !choice._selectionReady;
			});

			if (notReady.length) {
				notReady[0].addEventListener("selectionready", () => {
					this._setSelected(selected);
				});

				return;
			}

			let targetNode;
			let prevSelected;
			for (const choice of choices) {
				if (choice.selected) prevSelected = choice;
				if (choice.name === selected) targetNode = choice;

				if (selected === undefined && prevSelected) break;
				if (targetNode && prevSelected) break;
			}

			if (!targetNode && selected !== undefined) return;

			if (prevSelected) prevSelected.selected = false;
			if (targetNode) {
				this.selectedNode = targetNode;
				this._existingSelected = targetNode.name;
				targetNode.selected = true;

				calm.emit(this, "select", {detail: {
					selected,
					node: targetNode,
				}});
			}
		},

		_onTap(evt) {
			this.selected = evt.target.name;
		},
	},

	render: calm.shadowDom(`
		<style>
			:host {
				display: block;
				padding: 0;
				margin: 0;
			}
		</style>

		<content id="choices" select="*"></content>
	`),
});
