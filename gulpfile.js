#!/usr/bin/env node

/* eslint no-console: 0 */

const fs = require("fs");
const gulp = require("gulp");
const rollup = require("rollup").rollup;
const rollupCjs = require("rollup-plugin-commonjs");
const rollupNpm = require("rollup-plugin-npm");
const rollupBabel = require("rollup-plugin-babel");
const uglify = require("uglify-js");
const del = require("del");

const ROLLUP_OPTS = {
	entry: "index.js",
	plugins: [
		rollupNpm({
			jsnext: true,
			main: true,
		}),

		rollupCjs({
			include: "node_modules/**",
		}),

		rollupBabel({
			exclude: "node_modules/**",
		}),
	],
};

gulp.task("default", ["build"]);

gulp.task("build", () => {
	return rollup(ROLLUP_OPTS).then((bundle) => {
		return bundle.write({
			dest: "calm-ui.js",
			format: "iife",
		});
	});
});

gulp.task("build-release", () => {
	return rollup(ROLLUP_OPTS).then((bundle) => {
		return bundle.generate({
			format: "iife",
		});
	}).then((result) => {
		const minified = uglify.minify(result.code, {fromString: true});
		fs.writeFileSync("calm-ui.min.js", minified.code);
	})
});

gulp.task("build-debug", () => {
	return rollup(ROLLUP_OPTS).then((bundle) => {
		return bundle.write({
			dest: "calm-ui.js",
			format: "iife",
			sourceMap: true,
		});
	});
});

gulp.task("watch", () => {
	console.log("watching for changes...");
	gulp.watch("*", ["build"]);
});

gulp.task("clean", () => {
	return del("calm-ui.*");
});
