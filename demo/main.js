"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
Node.prototype.on = Node.prototype.addEventListener;

const bottomSheet = $("#bottom-sheet");
const dialog = $("#dialog");
const drawer = $("#drawer");
const drawerRight = $("#drawer-right");
const nav = $("#nav");
const pages = $("#pages");
const spinner = $("#spinner");
const demoPages = $("#demo-pages");
const demoPagesTabs = $("#demo-pages-tabs");
const toast = $("#toast");
const title = $("#title");
const progress = $("#progress");
const animatedIcon = $("#animated-icon");

$("#dialog-show").on("click", () => {
	dialog.modal = false;
	dialog.show();
});

$("#modal-dialog-show").on("click", () => {
	dialog.modal = true;
	dialog.show();
});

$("#bottom-sheet-show").on("click", () => bottomSheet.show());
$("#bottom-sheet-menu").on("click", (evt) => {
	if (evt.target.localName === "calm-item") {
		bottomSheet.hide();
	}
});

$("#dialog-hide").on("click", () => dialog.hide());
$("#drawer-show").on("click", () => drawer.show());
$("#drawer-hide").on("click", () => drawer.hide());
$("#demo-drawer-toggle").on("click", () => drawer.toggle());
$("#demo-drawer-right-toggle").on("click", () => drawerRight.toggle());
$("#spinner-toggle").on("click", () => spinner.toggle());
$("#toast-toggle").on("click", () => toast.toggle());

$("#animated-icon-change").on("click", () => {
	animatedIcon.icon = (animatedIcon.icon === "menu" ? "arrow-back" : "menu");
});

nav.on("select", () => {
	pages.selected = nav.selected;
	title.textContent = nav.querySelector("[selected]").textContent;
	drawer.hide();
});

demoPagesTabs.on("select", () => {
	demoPages.selected = demoPagesTabs.selected;
});

progress.value = 0;
window.setInterval(() => {
	progress.value = (progress.value >= 99.9 ? 0 : progress.value + 10);
}, 1000);
