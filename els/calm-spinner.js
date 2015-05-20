import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-spinner", {
	created(el) {
		calm.init(el, `
			<style>
				@-webkit-keyframes spin {
					0% {
						transform: rotateZ(0);
					}

					100% {
						transform: rotateZ(360deg);
					}
				}

				:host {
					display: block;
					width: 24px;
					height: 24px;

					color: ${calm.color};
					border-color: currentColor;
				}

				:host(.spinner-small) {
					width: 16px;
					height: 16px;
				}

				:host(.spinner-small) > #spinner {
					// animation-duration: ${calm.time.med};
				}

				#spinner {
					width: inherit;
					height: inherit;

					border-radius: 50%;
					border-color: inherit;
					border: 2px solid;
					border-top: 2px solid transparent;
					border-right: 2px solid transparent;

					animation: spin ${calm.time.long} linear infinite;
				}
			</style>

			<div id="spinner"></div>
		`)
	}
});
