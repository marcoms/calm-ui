import calm from "calm-tools";
import skate from "skatejs";

export default skate("calm-bar", {
	created(el) {
		calm.init(el, `
			<style>
				:host {
					display: block;
					background: #fff;
				}

				#bar {
					display: flex;
					align-items: stretch;
					background: inherit;
					width: 100%;
					height: 56px;
					line-height: 56px;
					box-shadow: 0 2px rgba(0, 0, 0, 0.15);
				}

				:host(.sticky) > #bar {
					position: fixed;
					top: 0;
					left: 0;
					z-index: 97;
				}

				::content > header {
					font-size: 20px;
					margin-left: 16px;
				}
			</style>

			<div id="bar"><content></content></div>
		`);
	}
});
