const shell = require("shelljs");
shell.mkdir('-p', 'dist/public/assets/icons');
shell.cp("-Rf", "src/server/db/", "dist/server/db/");
shell.cp("-Rf", "src/public/assets/", "dist/public/");