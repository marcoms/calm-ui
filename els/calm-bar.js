import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-bar", {
	template: calm.shadowDOM(`
		<style>
			:host {
				display: flex;
				align-items: stretch;

				width: 100%;
				height: 56px;

				overflow: hidden;
				box-shadow: ${calm.shadow[1]};
			}

			:host(.bar-sticky) {
				position: fixed;
				top: 0;
				left: 0;

				z-index: 97;
			}

			::content > header {
				font-size: 20px;
				line-height: 56px;
			}
		</style>

		<content></content>
	`),
});
