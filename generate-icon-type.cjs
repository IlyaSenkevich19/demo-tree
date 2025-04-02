const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const inputFile = path.join(__dirname, "assets/svg/sprite.icons.svg");
const outputFile = path.join(__dirname, "src/@types/IconNames.ts");

fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading SVG sprite:", err);
        return;
    }

    xml2js.parseString(data, (err, result) => {
        if (err) {
            console.error("Error parsing SVG sprite:", err);
            return;
        }

        const icons = result.svg.defs[0].symbol.map((symbol) => symbol.$.id);
        const enumContent = [
            "export type TIconNames =",
            ...icons.map((icon) => `"${icon}"`),
        ].join("\n  | ") + ";\n" + "\n" + [
            "export enum EIconNames {",
            ...icons.map((icon) => `  ${icon.replace(/-/g, "_").toUpperCase()} = "${icon}",`),
            "}",
        ].join("\n") + "\n";

        fs.writeFile(outputFile, enumContent, (err) => {
            if (err) {
                console.error("Error writing IconNames.ts:", err);
            } else {
                console.log("IconNames.ts successfully generated!!!)))");
            }
        });
    });
});