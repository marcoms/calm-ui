import calm from "calm-tools.js";
import skate from "skatejs";

export default skate("calm-app", {
	template: calm.shadowDom(`
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
				#bar::content [data-drawerctrl] {
					display: none;
				}

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

	created() {
		const drawerContent = this.$["drawer"];
		const drawer = drawerContent.getDistributedNodes()[0];
		drawer.addEventListener("layoutchange", (evt) => {
			(evt.detail.wideLayout ? drawerContent.classList.add("wide") : drawerContent.classList.remove("wide"));
		});

	}
})
