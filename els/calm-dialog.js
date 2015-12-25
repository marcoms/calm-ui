import calm from "../calm-tools";
import skate from "skatejs";

export default skate("calm-dialog", {
	properties: {
		shown: skate.properties.boolean({
			attribute: true,
		}),

		modal: skate.properties.boolean({
			attribute: true,
			default: false,
			set(el) {
				if (el.modal) {
					el.$["overlay"].removeEventListener("click", el._hide);
				} else {
					el.$["overlay"].addEventListener("click", el._hide);
				}
			},
		}),
	},

	prototype: {
		show() {
			this.shown = true;
		},

		hide() {
			this.shown = false;
		},

		toggle() {
			this.shown = !this.shown;
		},

		_hide() {
			this.hide();
		},
	},

	render: calm.shadowDom(`
		<style>
			#wrapper {
				position: fixed;
				top: 0;
				left: 0;
				z-index: 101;

				display: flex;
				width: 100%;
				height: 100%;

				align-items: center;
				justify-content: center;
				transform: translateY(100%);

				pointer-events: none;
				transition: transform ${calm.durations.medium} ${calm.easings.in};
			}

			#dialog {
				display: flex;
				box-sizing: border-box;
				min-width: 280px;

				flex-direction: column-reverse;

				pointer-events: all;
			}

			#content {
				padding: 24px;
			}

			#content ::content header {
				margin-bottom: 20px;

				font-size: 20px;
				font-weight: bold;
			}

			#actions {
				display: flex;

				justify-content: flex-end;
				padding: 8px;
			}

			#overlay {
				position: fixed;
				top: 0;
				left: 0;
				z-index: 100;

				width: 100%;
				height: 100%;

				background: #000;
				opacity: 0;
				visibility: hidden;

				transition-property: opacity, visibility;
				transition-duration: ${calm.durations.medium};
				transition-timing-function: linear;
				cursor: pointer;
			}

			:host([shown]) #wrapper {
				transform: none;

				transition: transform ${calm.durations.medium} ${calm.easings.out};
			}

			:host([shown]) #overlay {
				opacity: 0.25;
				visibility: visible;
			}

			:host([modal]) #overlay {
				cursor: auto;
			}
		</style>

		<div id="wrapper">
			<calm-card id="dialog" z="3">
				<div id="actions">
					<content select="calm-button"></content>
				</div>

				<div id="content">
					<content></content>
				</div>
			</calm-card>
		</div>

		<div id="overlay"></div>
	`),

	created(el) {
		// hack to access hide()
		el._hide = el._hide.bind(el);
	},
});
