"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var server = require("browser-sync").create();

var less = require("gulp-less");
var imagemin = require("gulp-imagemin");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var copy = require("gulp-copy");
var del = require("del");
var uglify = require("gulp-uglify");
var pipeline = require("readable-stream").pipeline;
var htmlmin = require("gulp-htmlmin");

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
  .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 75}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src(["source/img/icon-*.svg",
  "source/img/logo-htmlacademy.svg",
  "source/img/logo-footer.svg"
  ])
    .pipe(svgstore({
      inlinesvg: true
    }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
})

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
  .pipe(gulp.dest("build"));
})

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/*.min.js"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("compress", function () {
  return pipeline(
        gulp.src(["source/js/menu-nav.js", "source/js/modal.js"]),
        uglify(),
        rename({suffix: '.min'}),
        gulp.dest('build/js')
  );
});

gulp.task("minify-html", function() {
  return gulp.src("build/*.html")
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true
  }))
  .pipe(gulp.dest("build"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "compress",
  "css",
  "sprite",
  "html",
  "minify-html"
  ));

gulp.task("start", gulp.series("build", "server"));
