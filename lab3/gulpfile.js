const gulp = require('gulp4');
const less = require('gulp-less');
const babel = require('gulp-babel');
const del = require('del');

paths = {
    scripts: {
        src: './javascripts/*.js',
        dest: './public/scripts/'
    },
    css: {
        src: './less/*.less',
        dest: './public/stylesheets/'
    },
}

gulp.task('cleanJS', () => {
    return del(paths.scripts.dest);
});

gulp.task('createJS', () => {
    return gulp.src(paths.scripts.src)
        .pipe(babel())
        .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('cleanCSS', () => {
    return del(paths.css.dest);
});

gulp.task('createCSS', () => {
    return gulp.src(paths.css.src)
        .pipe(less())
        .pipe(gulp.dest(paths.css.dest));
});

gulp.task("default", gulp.parallel(gulp.series('cleanJS', 'createJS', watchJS), gulp.series('cleanCSS', 'createCSS', watchCSS)) );

function watchJS(){
    let watcher = gulp.watch(paths.scripts.src, gulp.series('default'));
}

function watchCSS(){
    let watcher = gulp.watch(paths.css.src, gulp.series('default'));
}
