const shell = require("shelljs");

shell.cp("-R", "src/assets/icons", "dist/public/");
shell.cp("-R", "src/public/assets/", "dist/public/");
