import calm from "calm-tools.js";
import skatejs from "skatejs";

export default skate("calm-selection", {
	properties: {
		selected: {
			attr: true,
			type: calm.propType(String),
			set(name) {
				if(name === this._existingName) return;

				let selectables = Array.from(this.$["selectables"].getDistributedNodes());

				let targetNode, prevSelected;
				for(let selectable of selectables) {
					if(selectable.selected) prevSelected = selectable;
					if(selectable.name === name) targetNode = selectable;

					if(name === undefined && prevSelected) break;
					if(targetNode && prevSelected) break;
				}

				if(!targetNode && name !== undefined) return;

				if(prevSelected) prevSelected.selected = undefined;
				if(targetNode) {
					this.selectedNode = targetNode;
					this._existingName = targetNode.name;
					targetNode.selected = true;

					calm.emit(this, "select", { detail: {
						name,
						node: targetNode,
					}});
				}
			},
		},

		tapselect: {
			attr: true,
			type: Boolean,
			set(value) {
				if(value) {
					this.addEventListener("click", this._onTap);
				} else {
					this.removeEventListener("click", this._onTap);
				}
			},
		},

		selectedNode: {},

		_existingName: {},
	},

	prototype: {
		_onTap(evt) {
			this.selected = evt.target.name;
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: block;
				padding: 0;
				margin: 0;
			}
		</style>

		<content id="selectables" select="*"></content>
	`),
})
