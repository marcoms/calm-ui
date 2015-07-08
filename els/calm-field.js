import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-field", {
	properties: {
		label: {
			attr: true,
			deps: "floatinglabel",
			set(label) {
				calm.ready(() => {
					if(this.floatinglabel === "") {
						this._field.removeAttribute("placeholder");
						this._label.textContent = label;
					} else {
						this._label.textContent = "";
						this._field.placeholder = label;
					}
				});
			},
		},

		floatinglabel: { attr: true },

		_label: {},
		_field: {},
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

				transition: box-shadow ${calm.time.short} linear;
			}

			#field[active],
			#field:focus {
				box-shadow: inset 0 -2px #00bcd4;

				transition: none;
			}

			::-webkit-input-placeholder { color: rgba(0, 0, 0, 0.5); }
			::-moz-placeholder { color: rgba(0, 0, 0, 0.5); }
			:-ms-input-placeholder { color: rgba(0, 0, 0, 0.5); }

			:host([floatinglabel]) #label {
				position: absolute;
				top: 16px;
				z-index: -1;

				color: rgba(0, 0, 0, 0.5);

				transform: none;
				transform-origin: top left;

				transition: transform ${calm.time.med} ${calm.ease.out}, color ${calm.time.med} linear;
			}

			:host([floatinglabel]) #field[active] ~ #label,
			:host([floatinglabel]) #field:focus ~ #label,
			:host([floatinglabel]) #field:not(.empty) ~ #label { transform: translateY(-100%) scale(0.75); }

			:host([floatinglabel]) #field[active] ~ #label,
			:host([floatinglabel]) #field:focus ~ #label {
				color: ${calm.color};

				transition: transform ${calm.time.med} ${calm.ease.out}, color 0ms linear;
			}
		</style>

		<input class="empty" id="field" type="text">
		<div id="label"></div>
	`),

	created() {
		this._label = this.shadowRoot.getElementById("label");
		this._field = this.shadowRoot.getElementById("field");

		this.shadowRoot.getElementById("field").addEventListener("blur", (evt) => {
			if(evt.currentTarget.value === "") {
				evt.currentTarget.classList.add("empty");
			} else {
				evt.currentTarget.classList.remove("empty");
			}
		});
	},
});
