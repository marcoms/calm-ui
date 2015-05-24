import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-field", {
	attributes: {
		placeholder: {
			created(el, diff) {
				el.setPlaceholder(diff.newValue);
			},

			updated(el, diff) {
				el.setPlaceholder(diff.newValue);
			},

			removed(el) {
				el.setPlaceholder("");
			},
		},
	},

	prototype: {
		setPlaceholder(placeholder) {
			this.shadowRoot.getElementById("field").placeholder = placeholder;
		},
	},

	template: calm.shadowDOM(`
		<style>
			:host {
				display: inline-block;
			}

			#field {
				outline: 0;
				border: 0;
				box-shadow: inset 0 -1px rgba(0, 0, 0, 0.2);
				font: inherit;
				color: inherit;
				background: transparent;
				padding: 8px 0;
				transition: box-shadow ${calm.time.short} linear;
			}

			#field.active {
				transition: none;
				box-shadow: inset 0 -2px #00bcd4;
			}

			#field:focus {
				transition: none;
				box-shadow: inset 0 -2px #00bcd4;
			}
		</style>

		<input data-handle-active id="field" type="text">
	`),
});
