const sass = require('node-sass');
module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'public/main.css': 'assets/scss/style.scss'
                }
            }
        },
        cssmin : {
            target : {
                src : "public/main.css",
                dest : "public/main.min.css"
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/main.min.js': 'public/main.js'
                }
            }
        },
        watch: {
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['uglify'],
            },
            styles: {
                files: ['assets/scss/*.scss'],
                tasks: ['sass', 'cssmin'],
            },
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : ['assets/scss/*.scss', 'assets/js/*.js']
                },
                options: {
                    watchTask: true,
                    proxy: "localhost:63342/zozonoza/public"
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'archive.zip'
                },
                files: [
                    {src: ['assets/**'], dest: 'archive/'}, // includes files in path
                    {src: ['public/**'], dest: 'archive/'}, // includes files in path and its subdirs
                ]
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    },
                    {
                        removeUselessStrokeAndFill: false
                    },
                    {
                        removeAttrs: {
                            attrs: [
                                'xmlns'
                            ]
                        }
                    }
                ]
            },
            dist: {
                files: {
                    'assets/img/compressed/logo.svg': 'assets/img/logo.svg'
                }
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'public/htmlmin/index.html': 'public/index.html',     // 'destination': 'source'
                    'public/htmlmin/index-en.html': 'public/index-en.html',
                    'public/htmlmin/diagnose.html': 'public/diagnose.html',
                    'public/htmlmin/symptome.html': 'public/symptome.html'
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'watch', 'compress', 'svgmin', 'htmlmin']);
    grunt.registerTask('server', ['default', 'browserSync', 'watch']);
};