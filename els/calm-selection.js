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

					let target, prevSelected;
					for(let selectable of selectables) {
						if(selectable.selected === "") prevSelected = selectable;
						if(selectable.name === name) target = selectable;

						if(name === undefined && prevSelected) break;
						if(target && prevSelected) break;
					}

					if(!target && name !== undefined) return;

					if(prevSelected) prevSelected.selected = undefined;
					if(target) {
						this._existingName = target.name;
						target.selected = "";
					}

					if(target) calm.emit(this, "select", { detail: { name, target } });
				});
			},
		},

		tapSelect: {
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

		_selectables: {},
		_existingName: {},
		_tapListener: {
			value() {
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
