const shell = require("shelljs");

shell.cp("-R", "src/assets/icons", "dist/public/assets/icons");
shell.cp("-R", "src/public/assets/", "dist/public/");
