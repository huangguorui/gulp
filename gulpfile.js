var gulp = require('gulp');
var imagemin = require('gulp-imagemin'); //引入图片压缩模块
var scriptmin = require('gulp-uglify'); //引入js压缩模块
var gulpless = require('gulp-less'); //引入less转换模块
var concat = require('gulp-concat'); //引入合并代码模块

/*
gulp.task -- 定义任务
gulp.src -- 找到需要执行任务的文件
gulp.dest -- 执行任务的文件的去处
gulp.watch -- 观察文件是否发生改变

执行任务 gulp + 任务名称 + 回车
*/

// 拷贝文件
gulp.task("copyHtml", function () {
    //pipe后面对应的地址就是将前面路径文件拷贝复制到哪里去
    gulp.src("src/*.html").pipe(gulp.dest("dist"))
});

//图片压缩
//安装模块 npm install --save-dev gulp-imagemin
gulp.task("imageMin", function () {
    gulp.src('src/images/*')
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 7
            }),
            imagemin.svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    }
                ]
            })
        ]))
        .pipe(gulp.dest('dist/images'))
})

// 压缩js
//安装js压缩模块 npm i gulp-uglify --save-dev
/*
gulp.task("scriptmin", function () {
    //pipe后面对应的地址就是将前面路径文件拷贝复制到哪里去
    gulp.src(["src/js/*.js", "!src/js/not.js"])
        .pipe(scriptmin())
        .pipe(gulp.dest("dist/js"))
});

*/

// 转换less
//安装js压缩模块 npm i gulp-less --save-dev
gulp.task("gulpless", function () {
    //pipe后面对应的地址就是将前面路径文件拷贝复制到哪里去
    gulp.src("src/css/*.less")
        .pipe(gulpless())
        .pipe(gulp.dest("dist/css"))
});

/*压缩*/
/*
gulp.task("taskName",function(){
    // 把1.js和2.js合并压缩为main.js，输出到dest/js目录下
    gulp.src("src/js/*.js")
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dest/js'));
})
*/



//代码合并
//安装 npm i gulp-concat --save-dev  //在合并的时候压缩js
gulp.task("concat", function () {
    gulp.src("src/js/*.js")
        .pipe(concat("main.js"))
        .pipe(scriptmin())
        .pipe(gulp.dest("dist/js"))
})

//监听文件是否发生改变
gulp.task("watch", function () {
    gulp.watch("src/*.html", ["copyHtml"]);
    gulp.watch("src/css/*.less", ["gulpless"]);
    gulp.watch("src/images/*", ["imageMin"]);
    gulp.watch("src/js/*.js", ["scriptmin"]);
})

//如果直接执行 gulp 那么就是运行任务名称为‘default’的任务,后面数组代表所需要执行的任务列表
gulp.task('default', ["copyHtml", "gulpless","concat","imageMin"]);


//stream-combiner2模块下面代码可打印gulp报错信息
var combiner = require('stream-combiner2');
var uglify = require('gulp-uglify');
var gulp = require('gulp');

gulp.task('test', function() {
  var combined = combiner.obj([
    gulp.src('bootstrap/js/*.js'),
    uglify(),
    gulp.dest('public/bootstrap')
  ]);

  // any errors in the above streams will get caught
  // by this listener, instead of being thrown:
  combined.on('error', console.error.bind(console));

  return combined;
});
