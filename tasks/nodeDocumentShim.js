var document = document || null;
if (!document) {
    var fs = require("fs");
    var candidateNames = fs.readdirSync(".").filter(x => x.indexOf(".txt") >= 0);
    if (candidateNames.length == 0) throw new Error("There is no input file here :( ");
    else {
        var candidate = candidateNames[0];
        console.log(`Reading ${candidate}.`);
        var input = fs.readFileSync(candidate).toString();
        document = {
            body: {
                textContent: input
            }
        }
    }
}
module.exports = document;