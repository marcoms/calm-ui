import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-field", {
	attributes: {
		label: {
			created(el, diff) {
				el.setLabel(diff.newValue);
			},

			updated(el, diff) {
				el.setLabel(diff.newValue);
			},

			removed(el) {
				el.setLabel("");
			},
		},

		floatingLabel: {},
	},

	prototype: {
		setLabel(label) {
			if(this.floatingLabel === "")  {
				this.shadowRoot.getElementById("label").textContent = label;
			} else {
				this.shadowRoot.getElementById("field").placeholder = label;
			}
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				position: relative;

				display: inline-block;
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

			:host([floatinglabel]) #field.active ~ #label,
			:host([floatinglabel]) #field:focus ~ #label,
			:host([floatinglabel]) #field:not(.empty) ~ #label {
				transform: translateY(-100%) scale(0.75);
			}

			:host([floatinglabel]) #field.active ~ #label,
			:host([floatinglabel]) #field:focus ~ #label {
				color: ${calm.color};

				transition: transform ${calm.time.med} ${calm.ease.out}, color 0ms linear;
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

			#field.active,
			#field:focus {
				box-shadow: inset 0 -2px #00bcd4;

				transition: none;
			}
		</style>

		<input class="empty" data-handle-active id="field" type="text">
		<div id="label"></div>
	`),

	created(el) {
		el.shadowRoot.getElementById("field").addEventListener("blur", (evt) => {
			if(evt.currentTarget.value === "") {
				evt.currentTarget.classList.add("empty");
			} else {
				evt.currentTarget.classList.remove("empty");
			}
		});
	},
});
