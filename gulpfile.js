var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch');

var paths = {
    scripts: ['gulpfile.js', 'app.js', 'public/app/*.js'],
    templates: ['public/index.html']
}

gulp.task('lint', function() {
    var jshint_conf = {
        "predef": ["angular"]
    };
    return gulp.src(paths.scripts)
        .pipe(jshint(jshint_conf))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts);
});
