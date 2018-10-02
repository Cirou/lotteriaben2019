const shell = require("shelljs");
shell.mkdir('-p', 'dist/public/assets/icons');
shell.cp("-Rf", "src/public/assets/", "dist/public/");