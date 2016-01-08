var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    proc = require('child_process');

var paths = {
    scripts: ['gulpfile.js', 'app.js', 'public/app/*.js'],
    templates: ['public/index.html'],
    tests: {
        confs: ['test/protractor-conf.js']
    }
};

gulp.task('lint', function() {
    var jshint_conf = {
        "predef": ["angular"]
    };
    return gulp.src(paths.scripts)
        .pipe(jshint(jshint_conf))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['js']);
    gulp.watch(paths.scripts, ['html']);

});


//E2E Testing Start, requires protractor installed

gulp.task('test', ['webdriver-update', 'webdriver-start', 'protractor']);

gulp.task('webdriver-update', function(done) {
    proc.spawn('webdriver-manager', ['update'], {
        stdio: 'inherit'
    }).once('close', done);
});

gulp.task('webdriver-start', ['webdriver-update'], function(done) {

    var child = proc.spawn('webdriver-manager', ['start'], {
        stdio: 'pipe'
    });

    child.on('close', done);

    child.stdout.on('data', function(data) {
        console.log(data.toString());
        done(null, proc);
    })
});

gulp.task('protractor', ['webdriver-start'], function(done) {
    var argv = paths.tests.confs;
    proc.spawn('protractor', argv, {
        stdio: 'inherit'
    }).once('close', done);
});
