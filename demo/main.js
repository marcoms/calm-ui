"use strict";

const $ = document.querySelector.bind(document), $$ = document.querySelectorAll.bind(document);
Node.prototype.on = Node.prototype.addEventListener;

const dialog = $("#dialog");
const drawer = $("#drawer");
const drawerRight = $("#drawer-right");
const drawerBottom = $("#drawer-bottom");
const drawerBottomMenu = $("#drawer-bottom-menu");
const nav = $("#nav");
const pages = $("#pages");
const spinner = $("#spinner");
const demoPages = $("#demo-pages");
const demoPagesTabs = $("#demo-pages-tabs");
const toast = $("#toast");
const title = $("#title");
const progress = $("#progress");

$("#dialog-show").on("click", () => dialog.show());
$("#dialog-hide").on("click", () => dialog.hide());
$("#drawer-show").on("click", () => drawer.show());
$("#drawer-hide").on("click", () => drawer.hide());
$("#drawer-bottom-menu").on("select", () => drawerBottom.hide());
$("#demo-drawer-toggle").on("click", () => drawer.toggle());
$("#demo-drawer-right-toggle").on("click", () => drawerRight.toggle());
$("#demo-drawer-bottom-toggle").on("click", () => drawerBottom.toggle());
$("#spinner-toggle").on("click", () => spinner.toggle());
$("#toast-toggle").on("click", () => toast.toggle());

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
	progress.value = (progress.value + 10) % 100;
}, 1000);
