import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-spinner", {
	attributes: { small: {}, },

	template: calm.shadowDOM(`
		<style>
			@keyframes spin {
				from { transform: none; }
				to { transform: rotateZ(360deg); }
			}

			:host {
				display: block;
				width: 24px;
				height: 24px;

				color: ${calm.color};
				border-color: currentColor;
			}

			:host([small]) {
				width: 16px;
				height: 16px;
			}

			#spinner {
				width: 100%;
				height: 100%;

				border-radius: 50%;
				border-color: inherit;
				border: 2px solid;
				border-top: 2px solid transparent;
				border-right: 2px solid transparent;

				animation: spin ${calm.time.long} linear infinite;
			}
		</style>

		<div id="spinner"></div>
	`),
});
