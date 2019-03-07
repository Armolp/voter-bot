const fs = require("fs");
const { dataPath } = require("./config.json");

exports.saveData = function(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

exports.readData = function() {
    return require(dataPath);
}