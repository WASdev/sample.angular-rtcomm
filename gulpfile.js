var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('default', function() {

})

gulp.task('lint', function() {
    var jshint_conf = {
        "predef": ["angular"]
    }
    return gulp.src(['app.js', 'public/app/*.js'])
        .pipe(jshint(jshint_conf))
        .pipe(jshint.reporter('jshint-stylish'));
});
