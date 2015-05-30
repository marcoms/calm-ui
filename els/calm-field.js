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
	},

	prototype: {
		setLabel(label) {
			if(this.classList.contains("field-floating-label")) {
				this.shadowRoot.getElementById("label-floating").textContent = label;
			} else {
				this.shadowRoot.getElementById("field").placeholder = label;
			}
		},
	},

	template: calm.shadowDOM(`
		<style>
			:host {
				position: relative;

				display: inline-block;
			}

			::-webkit-input-placeholder { color: rgba(0, 0, 0, 0.5); }
			::-moz-placeholder { color: rgba(0, 0, 0, 0.5); }
			:-ms-input-placeholder { color: rgba(0, 0, 0, 0.5); }

			:host(.field-floating-label) #label-floating {
				position: absolute;
				top: 16px;
				z-index: -1;

				color: rgba(0, 0, 0, 0.5);

				transform: none;
				transform-origin: top left;

				transition: transform ${calm.time.med} ${calm.ease.out}, color ${calm.time.med} linear;
			}

			:host(.field-floating-label) #field.active ~ #label-floating,
			:host(.field-floating-label) #field:focus ~ #label-floating,
			:host(.field-floating-label) #field:not(.empty) ~ #label-floating {
				transform: translateY(-100%) scale(0.75);
			}

			:host(.field-floating-label) #field.active ~ #label-floating,
			:host(.field-floating-label) #field:focus ~ #label-floating {
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
		<div id="label-floating"></div>
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
