# webkit-speech

Webkit speech generator

## Base Dependencies
- node/npm (http://nodejs.org/)
- bower (https://npmjs.org/package/bower)
- grunt-cli (http://gruntjs.com/getting-started)
- ruby (already installed on OSX)
- sass (http://sass-lang.com/install)

## Project Installation - NPM
This project can be installed locally using npm. After checking the project out from source control, `cd` to the root directory where package.json is located, and `npm install ./`.

## Third Party Libs - Bower
Third party js libs on this project are managed using Bower. Libs are installed initially with `bower install [libname]`, and then the `grunt run` command includes a task to copy Bower components over to `src/vendor`, which is included in source control. When installing a new third party lib using Bower, you can run a `grunt bower` command to copy the new lib over to the vendor folder. Also make sure to add a new entry to the Gruntfile under the concat:vendor task.

## Workflow
All development work should be done in the 'src' directory. Use the grunt commands below for running the project locally and processing for handoff to QA/Staging/Production.

## Using grunt in the Terminal
`cd` to the trunk directory with the Gruntfile.js and use the following commands:

- `grunt run` : runs a local static server with automatic live-reloading on port http://localhost:<%= serverPort %>. Lints javascript, compiles SASS, and copies all files over to a 'local' folder that the static server points to. Watches all files for changes.
- `grunt build` : packages all files for delivery to staging or production, output to a 'public' folder. Lints javascript, optimizes javascript, compiles and minifies CSS.

## Jasmine Testing

When enabled jasmine testing will allow you to write tests in the src/specs folder and have those tests run anytime you make a change to your js files located in scr/scripts or your tests files. This is configured as part of the grunt run task so you should not need to configure anything. ** if you add new files to the scripts or specs folder make sure to stop the 'grunt run' task and run it again otherwise the tests, jshint and other plugins won't run against the new files**

The naming convention for a new spec file should be the name of the module/view the test will applied to followed by Spec.js.
If I need a new test for a module/view called sample.js I would then create a SampleSpec.js under src/specs/.

If you want to run a test manually without having to do a grunt run and modifying a "Spec" file, simply run"

- `$ grunt jasmine:dev`

If you are using browserify you will need to compile the specs and js file first by running:

- `$ grunt clean:tmp`
- `$ grunt browserify:dev`
- `$ grunt browserify:test`
- `$ grunt jasmine:dev`
