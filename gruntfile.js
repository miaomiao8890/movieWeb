module.exports = function(grunt){

	grunt.initConfig({
		watch: {
			jade: {
				files: ["views/**"],
				options: {
					livereload: true
				}
			},
			js: {
				files: ["public/js/**", "models/**/*.js", "schemas/**/*.js"],
				//tasks: ["jshint"],
				options: {
					livereload: true
				}
			},
			uglify: {
				files: ['public/**/*.js'],
				//tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: ['public/**/*.less'],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			}
		},

		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					'public/build/index.css': 'public/less/index.less'
				}
			}
		},

		uglify: {
			development: {
				files: {
					'public/build/admin.min.js': 'public/js/admin.js',
					'public/build/detail.min.js': [
						'public/js/detail.js'
					]
				}
			}
		},

		nodemon: {
			dev: {
				options: {
					script: "app.js",
					args: [],
					ignoredFiles: ["README.md", "node_modules/**", ".DS_Store"],
					watchedExtensions: ["js"],
					watchedFolders: ["app", "config"],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},

		concurrent: {
			tasks: ["nodemon", "watch", 'less', 'uglify'],
			options: {
				logConcurrentOutput: true
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-nodemon");
	grunt.loadNpmTasks("grunt-concurrent");
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.option("force", true);
	grunt.registerTask("default", ["concurrent"]);
}