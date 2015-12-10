var document = document || null;
if (!document) {
    var fs = require("fs");
    var candidateNames = fs.readdirSync(".").filter(x => x.indexOf(".js") == -1 && fs.statSync(x).size);
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
        console.log("document.body.textContent replacement ready.");
    }
}
module.exports = document;