Javascript
---

Good ol' javascript. Everyone's favourite. Wait? It isn't? Oh, it is mine... So here lay the solutions in javascript, utilizing ES6 features.

The solutions are using a common preabmle, so that they can be either run in a browser or in *node.js*. This is only assigning the document.body.textContent the contents of an input file placed next to the script.

Here be the preamble:
```javascript
    var document = document || null;
    if (!document){
        var fs = require("fs");
        var candidateNames = fs.readdir().filter(x=>x.indexOf(".js") == -1);
        if (candidateNames.length==0) throw new Error("There is no input file here :( ");
        else {
            var candidate = candidateNames[0];
            console.log(`Reading ${candidate}.`);
            var input = fs.readFileSync(candidate).toString();
            document = { 
                body : { textContent : input }
            }
            console.log("document.body.textContent replacement ready.");
        }
    }
    module.exports = document;
```

Enjoy.