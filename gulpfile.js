var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var scss = require('gulp-sass');
var uglify = require('gulp-uglify');
var prettify = require('gulp-prettify');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var notify = require("gulp-notify");
var pngcrush = require('imagemin-pngcrush');
var react = require('gulp-react');
//var rename = require('gulp-rename');


var paths = {
    scripts: 'dev/js/**/*',
    jslibs: [
        'bower_components/jquery/dist/jquery.min.js',
//        'bower_components/zepto/zepto.min.js',
        'bower_components/react/react.js',
        'bower_components/barekit/js/barekit.min.js'
    ],
    images: 'dev/img/**/*',
    jsx: 'dev/jsx/**/*',
    html: 'dev/**/*.html',
    scss: ['dev/scss/main.scss',
        'bower_components/barekit/css/barekit.scss']
};

gulp.task('jsx', function () {
    return gulp.src(paths.jsx)
        .pipe(react())
        .pipe(gulp.dest('dev/js'));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      path: 'dist',
      port: '8088',
      directoryListing: false,
      open: true
    }));
});

gulp.task('clean', function (cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del(['build'], cb);
});

gulp.task('htmlcat', function () {
    return gulp.src(paths.html)
        .pipe(prettify())
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('build'));
});


gulp.task('sass', function () {
    return gulp.src(paths.scss)
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('dev/css'));
});

gulp.task('csscat', ['sass'], function () {
    return gulp.src('dev/css/**/*')
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('uglifyjs', ['jsx'], function () {
    return gulp.src(paths.scripts)
        .pipe(uglify({'mangle':false}))
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(gulp.dest('build/js'));
});

// Copy all static libraries
gulp.task('jslibs', function () {
    return gulp.src(paths.jslibs)
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', function () {
    return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false}
            ],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(gulp.dest('build/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['uglifyjs']);
    gulp.watch(paths.jsx, ['uglifyjs']);
    gulp.watch('dev/scss/**/*', ['csscat']);
    gulp.watch(paths.html, ['htmlcat']);
    gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'htmlcat', 'csscat', 'uglifyjs', 'images', 'jslibs', 'jsx', 'webserver']);

