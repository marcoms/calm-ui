import calm from "calm-tools.js";
import skatejs from "skatejs";

export default skate("calm-selection", {
	properties: {
		selected: {
			attr: true,
			set(name) {
				calm.ready(() => {
					if(name === this._existingName) return;

					let selectables = Array.from(this._selectables.getDistributedNodes());

					let targetNode, prevSelected;
					for(let selectable of selectables) {
						if(selectable.selected === "") prevSelected = selectable;
						if(selectable.name === name) targetNode = selectable;

						if(name === undefined && prevSelected) break;
						if(targetNode && prevSelected) break;
					}

					if(!targetNode && name !== undefined) return;

					if(prevSelected) prevSelected.selected = undefined;
					if(targetNode) {
						this.selectedNode = targetNode;
						this._existingName = targetNode.name;
						targetNode.selected = "";

						calm.emit(this, "select", { detail: {
							name,
							node: targetNode,
						} });
					}
				});
			},
		},

		tapselect: {
			attr: true,
			set(value) {
				calm.ready(() => {
					if(value === "") {
						this.addEventListener("click", this._tapListener);
					} else {
						this.removeEventListener("click", this._tapListener);
					}
				});
			},
		},

		selectedNode: {},

		_selectables: {},
		_existingName: {},
		_tapListener: {
			init() {
				return (evt) => {
					this.selected = evt.target.name;
				};
			},

			set(val) { return; }
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

	created() {
		this._selectables = this.shadowRoot.getElementById("selectables");
	},
})
