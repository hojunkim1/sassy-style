import del from "del";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import { dest, parallel, series, src, watch } from "gulp";

const sass = gulpSass(dartSass);

const routes = {
  styles: {
    watch: "src/scss/*",
    src: "src/scss/styles.scss",
    dist: "dist/styles",
  },
};

// Tasks

const clean = () => del(["dest/"]);

const styles = () =>
  src(routes.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace",
      })
    )
    .pipe(csso())
    .pipe(dest(routes.styles.dist));

const watchFile = () => {
  watch(routes.styles.watch, styles);
};

// Export

const prepare = series([clean]);
const assets = series([styles]);
const live = parallel([watchFile]);

export const dev = series([prepare, assets, live]);
