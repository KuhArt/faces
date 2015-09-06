/**
 * Created by artkuh on 6.9.15.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            'public/bundle.js': ['public/javascripts/script.js']
        },
        watch: {
            files: ["public/javascripts/*.js"],
            tasks: ['browserify']
        }
    });
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-watch')
};