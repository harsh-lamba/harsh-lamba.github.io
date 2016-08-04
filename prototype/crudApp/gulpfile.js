/* jshint node: true, -W024, -W040, -W098, -W126 */

'use strict';

var config = require("./gulp.config")();
var gulp = require("gulp");
var broswerSync = require("browser-sync").create();

var $ = require("gulp-load-plugins")({
	rename: {
		"gulp-sass"		: "sass",
		"gulp-util"		: "logger",
		"gulp-concat"	: "concate",
		"gulp-rename"	: "rename",
		"gulp-uglify"	: "minify",
		"gulp-eslint"	: "eslint"
	}
});

// Static server
gulp.task("browser-sync", function() {
    broswerSync.init({
        server: {
            baseDir: "./",
            directory : true
        }
    });
});

//Sass Compile
gulp.task("sass", function(){
	$.logger.log('Compiling Sass into css');
	return gulp
			.src(config.rootSass)
			.pipe($.sass())
			.pipe(gulp.dest("app/tmp/"))
			.pipe(broswerSync.stream());
});

//Sass files watch
gulp.task("sass:watch", function(){
	gulp.watch(config.allSass, ["sass"])
});

//Concatenate Lib files and uglify
gulp.task("js:lib", function(){
	$.logger.log(config.allLib);
	return gulp
			.src(config.allLib)
			.pipe($.concate("lib.js"))
			.pipe($.rename("lib.min.js"))
			.pipe(gulp.dest(config.temp));
});

//Concatenate all application specific js
gulp.task("js:app", function(){
	$.logger.log("All angular files");
	return gulp
			.src(config.allApp)
			.pipe($.concate("app.js"))
			.pipe(gulp.dest(config.temp));
});

//javascript files linting using eslint plugin
gulp.task("js:lint", function(){
	$.logger.log("Angular files are being linted");
	return gulp
			.src(config.allApp)
			.pipe($.eslint(
				{
					rules : {
						"strict" : 1,
						"camelcase" : 2,
						"comma-dangle" : 0
					},
					globals : [
						"jQuery",
						"$"
					],
					envs : [
						"browser"
					]
				}
			))
			.pipe($.eslint.formatEach('compact', process.stderr))
			.pipe($.eslint.results(function(results){
				$.logger.log(results.length);
				$.logger.log(results.warningCount);
				$.logger.log(results.errorCount);
			}))
});

//Build Task
gulp.task("run", ["sass", "js:lib", "js:app", "browser-sync", "sass:watch"]);