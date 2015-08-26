import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-field", {
	properties: {
		label: {
			attr: true,
			set(label) {
				this._setLabel(label);
			},
		},

		floatinglabel: {
			attr: true,
			set(value) {
				if(value === "") {
					this.addEventListener("input", this._checkEmpty);
				} else {
					this.removeEventListener("input", this._checkEmpty);
				}

				this._checkEmpty();
				this._setLabel(this.label);
			},
		},
	},

	prototype: {
		_setLabel(label) {
			if(this.floatinglabel === "") {
				this.$["field"].removeAttribute("placeholder");
				this.$["label"].textContent = label;
			} else {
				this.$["label"].textContent = "";
				this.$["field"].placeholder = label;
			}
		},

		_checkEmpty() {
			if(this.$["field"].value === "") {
				this.$["field"].classList.add("empty");
			} else {
				this.$["field"].classList.remove("empty");
			}
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				position: relative;

				display: inline-block;
			}

			#field {
				padding: 16px 0 8px 0;

				outline: 0;
				border: 0;
				box-shadow: inset 0 -1px rgba(0, 0, 0, 0.2);
				font: inherit;
				color: inherit;
				background: transparent;

				transition: box-shadow ${calm.durations.short} linear;
			}

			#field[active],
			#field:focus {
				box-shadow: inset 0 -2px #00bcd4;

				transition: none;
			}

			::-webkit-input-placeholder {
				color: rgba(0, 0, 0, 0.5);
			}

			::-moz-placeholder {
				color: rgba(0, 0, 0, 0.5);
			}

			:-ms-input-placeholder {
				color: rgba(0, 0, 0, 0.5);
			}

			:host([floatinglabel]) #label {
				position: absolute;
				top: 16px;
				z-index: -1;

				color: rgba(0, 0, 0, 0.5);

				transform: none;
				transform-origin: top left;

				transition: transform ${calm.durations.medium} ${calm.easings.out}, color ${calm.durations.medium} linear;
			}

			:host([floatinglabel]) #field[active] ~ #label,
			:host([floatinglabel]) #field:focus ~ #label,
			:host([floatinglabel]) #field:not(.empty) ~ #label {
				transform: translateY(-100%) scale(0.75);
			}

			:host([floatinglabel]) #field[active] ~ #label,
			:host([floatinglabel]) #field:focus ~ #label {
				color: ${calm.color};

				transition: transform ${calm.durations.medium} ${calm.easings.out}, color 0ms linear;
			}
		</style>

		<input id="field" type="text">
		<div id="label"></div>
	`),
});
