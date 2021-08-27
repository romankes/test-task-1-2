import gulp from 'gulp';
import browserSync from 'browser-sync';
import include from 'gulp-file-include';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import groupMedia from "gulp-group-css-media-queries";
import minCss from "gulp-clean-css";
import rename from "gulp-rename";
import autoprefixer from "gulp-autoprefixer";
import del from 'del';
import webpack from  'webpack';
import webpackStream from  'webpack-stream';
import webpackConfig from './webpack.config.js';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';

const sass = gulpSass(dartSass);
const {dest, src} = gulp;

const path = {
    views: {
        src: './src/index.html',
        dist: './dist/',
        watch: [
            './src/index.html',
            './src/blocks/**/*.html'
        ]
    },
    styles: {
        src: './src/styles/main.scss',
        dist: './dist/styles/',
        watch: [
            './src/styles/**/*.scss',
            './src/styles/main.scss',
            './src/blocks/**/*.scss'
        ]
    },
    scripts: {
        src: './src/js/index.js',
        dist: './dist/js/',
        watch: [
            './src/js/index.js',
            './src/blocks/**/*.js'
        ]
    },
    images: {
        src: './src/img/**/*.{jpg,jpeg,png,gif,svg}',
        dist: './dist/img/',
        watch: './src/img/**/*.{jpg,jpeg,png,gif,svg}'
    },
    fonts: {
        src: './src/fonts/**/*.{woff,woff2,ttf}',
        dist: './dist/fonts/',
        watch: './src/fonts/**/*.{woff,woff2,ttf}'
    }
};

const server = () => {
    browserSync.init({
        server: "./dist/",
        port: 4000,
        notify: true
    });
};
const views = () => {
    return src(path.views.src)
        .pipe(include({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(dest(path.views.dist))
        .pipe(browserSync.stream());
};
const styles = () => {
    return src(path.styles.src)
            .pipe(sass())
            .pipe(groupMedia())
            .pipe(autoprefixer({
                cascade: false,
                grid: true
            }))
            .pipe(minCss({
                compatibility: 'ie8',
                level: {
                    1: {
                        specialComments: 0,
                        removeEmpty: true,
                        removeWhitespace: true
                    },
                    2: {
                        mergeMedia: true,
                        removeEmpty: true,
                        removeDuplicateFontRules: true,
                        removeDuplicateMediaBlocks: true,
                        removeDuplicateRules: true,
                        removeUnusedAtRules: false
                    }
                }
            }))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(dest(path.styles.dist))
            .pipe(browserSync.stream());
};
const clean = () => del(['./dist/*']);
const scripts = () => {
    return src(path.scripts.src)
            .pipe(webpackStream(webpackConfig), webpack)
            .pipe(dest(path.scripts.dist))
            .pipe(browserSync.stream());
};
const images = () => {
    return src(path.images.src)
            .pipe(newer(path.images.dist))
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [
                    { removeViewBox: false },
                    { removeUnusedNS: false },
                    { removeUselessStrokeAndFill: false },
                    { cleanupIDs: false },
                    { removeComments: true },
                    { removeEmptyAttrs: true },
                    { removeEmptyText: true },
                    { collapseGroups: true }
                ],
                interlaced: true,
                optimizationLevel: 3
            }))
            .pipe(dest(path.images.dist))
            .pipe(browserSync.stream());
};
const fonts = () => {
    return src(path.fonts.src)
            .pipe(dest(path.fonts.dist))
            .pipe(browserSync.stream());
};
const watchFiles = () => {
    gulp.watch([...path.views.watch], views);
    gulp.watch([...path.styles.watch], styles);
    gulp.watch([...path.scripts.watch], scripts);
    gulp.watch([path.images.watch], images);
    gulp.watch([path.fonts.watch], fonts);
};

const build = gulp.series(clean, gulp.parallel(views, styles, scripts, images, fonts));
const watch = gulp.parallel(build, watchFiles, server);

export {views, styles, scripts, images};
export default watch;