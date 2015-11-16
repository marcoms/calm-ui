import calm from "../calm-tools";
import skate from "skatejs";

export default skate("calm-app", {
	render: calm.shadowDom(`
		<style>
			:host {
				display: flex;
				width: 100vw;
				height: 100vh;
				overflow: auto;
			}

			#wrapper {
				width: 100%;
				height: 100%;
				overflow: auto;
			}

			#content {
				padding: 16px;
			}

			#drawer:not(.wide)::content calm-drawer {
				flex: 0;
			}

			@media (min-width: ${calm.breakpoints.medium}) {
				#bar::content [data-drawerctrl],
				#drawer::content [data-drawerctrl] {
					display: none;
				}
			}
		</style>

		<content id="drawer" select="calm-drawer"></content>
		<div id="wrapper">
			<content id="bar" select="calm-bar"></content>
			<div id="content">
				<content></content>
			</div>
		</div>
	`),

	ready(el) {
		const drawerContent = el.$["drawer"];
		const drawer = drawerContent.getDistributedNodes()[0];
		drawer.addEventListener("layoutchange", (evt) => {
			if (evt.detail.wideLayout) {
				drawerContent.classList.add("wide");
			} else {
				drawerContent.classList.remove("wide");
			}
		});
	},
});
