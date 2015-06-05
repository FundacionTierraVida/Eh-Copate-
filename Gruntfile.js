/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */
module.exports = function(grunt) {

  grunt.initConfig({
    less: {
        options: {
          compress: true
        },
        build: {
           files: {
              'build/styles/main.css': 'src/styles/*.less',
              'build/styles/bootstrap.css': 'bower_components/bootstrap/dist/css/bootstrap.min.css'
            }
        }
    },
    watch: {
        styles: {
           files: ['src/styles/*.less'],
           tasks: ['less:build'],
           options: {
              spawn: false
            }
        },
        script: {
           files: ['src/js/*.js'],
           tasks: ['uglify:build'],
           options: {
              spawn: false
            }
        },
        html: {
           files: ['src/**/*.html'],
           tasks: ['htmlmin:build'],
           options: {
              spawn: false
            }
        }
    },
    jshint: {
      files: ['src/js/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      },
      all: [ 'Gruntfile.js', 'src/js/*.js']
    },
    lesslint: {
      files: ['src/styles/*.less']
    },
    csslint: {
      files: ['build/styles/*.css']
    },
    uglify: {
        build: {
          files: {
            'build/js/jquery.min.js': ['bower_components/jquery/dist/jquery.min.js'],
            'build/js/bootstrap.min.js': ['bower_components/bootstrap/dist/js/bootstrap.min.js'],
            'build/js/script.min.js': ['src/js/script.js']
            }
        }
    },
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'src/index.html'
        }
      }
    },
    copy: {
        code: {
          expand: true,
          cwd: 'src/styles/',
          src: ['main.css'],
          dest: 'build/styles/',
        },
        img: {
          expand: true,
          cwd: 'src/img/',
          src: ['**'],
          dest: 'build/img/',
        },
        fonts: {
          expand: true,
          cwd: 'src/fonts/',
          src: ['**'],
          dest: 'build/fonts/',
        }
    },
    clean: {
      options: {
        force: false,
        'no-write': false
      },
      scripts: ['build/js/*js'],
      styles: ['build/styles/*css'],
      build: ['build/']
    },
    jsbeautifier: {
      files: ['src/**/*.js', 'src/**/*.html'],
      options: {
          html: {
              indentSize: 4
          },
          js: {
              indentLevel: 0,
              indentSize: 4,
              spaceInParen: true
          }
      }
    },
    'http-server': {
      dev: {
          root: 'build/',
          port: 8080,
          host: 'localhost',
          showDir : true,
          autoIndex: true,
          ext: 'html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-lesslint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-newer');
  
  grunt.registerTask('clear', 'Remove build directory', ['clean:build']);
  grunt.registerTask('build', 'Create the project into build folder', ['less:build', 'uglify:build', 'htmlmin:build', 'copy']);
  grunt.registerTask('buildFast', 'Create the project into build folder fast', ['newer:less:build', 'newer:uglify:build','newer:htmlmin:build', 'newer:copy']);
  grunt.registerTask('test', 'Test the js and less files', ['jshint:all', 'lesslint', 'csslint']);
  grunt.registerTask('run', 'Run prject on server', ['http-server:dev']);
  grunt.registerTask('pretty', 'Made the code of all js into src folder prettier', ['jsbeautifier']);
  grunt.registerTask('default', ['clear', 'build']);

};