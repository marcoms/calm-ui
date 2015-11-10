import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-dialog", {
	properties: {
		shown: skate.properties.boolean({
			attribute: true,
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

				transition: transform ${calm.durations.long} ${calm.easings.in};
			}

			#dialog {
				display: flex;
				box-sizing: border-box;
				min-width: 280px;

				flex-direction: column-reverse;
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
				transition-duration: ${calm.durations.long};
				transition-timing-function: linear;
			}

			:host([shown]) #wrapper {
				transform: none;

				transition: transform ${calm.durations.long} ${calm.easings.out};
			}

			:host([shown]) #overlay {
				opacity: 0.25;
				visibility: visible;
			}
		</style>

		<div id="wrapper">
			<calm-card id="dialog" z="3">
				<div id="actions">
					<content select="calm-btn"></content>
				</div>

				<div id="content">
					<content></content>
				</div>
			</calm-card>
		</div>

		<div id="overlay"></div>
	`),
});
