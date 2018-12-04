const shell = require("shelljs");
shell.mkdir('-p', 'dist/public/assets/icons');
shell.cp("-Rf", "src/public/assets/", "dist/public/");
shell.mkdir('-p', 'dist/.well-known');
shell.cp("-Rf", "src/.well-known", "dist/");