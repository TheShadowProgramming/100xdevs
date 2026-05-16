const { Command } = require('commander');
const program = new Command();
const path = require('path');
const fs = require("node:fs");

program
.name("count-lines")
.description("it counts the number of lines in the file")
.version("0.0.1")

program.command("count")
.description("count the number of lines in the file")
.argument("<string>", "name of the file in which you want to count the lines")
.option("-C, --capital", "only count the lines starting with Capital letter in the file")
.action(async (arg, options) => {
    let lineSplittedArrays;
    let filePath = path.join(`${__dirname}/` + `${arg}`);
    let lineCount = 0;
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        lineSplittedArrays = data.split('\n')
        for (const line of lineSplittedArrays) {
            lineCount++;
        }   
        console.log(`There are ${lineCount} number of lines in the file ${arg}`)
    } catch (error) {
        console.log(error)
    }
    if (options.capital) {
        let count = 0;
        let capitalLettersString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for (const line of lineSplittedArrays) {
            if (capitalLettersString.includes(line[0])) {
                count++;
            }
        }
        console.log(`There are ${lineSplittedArrays.length} lines in the ${arg} file! and ${count} number of lines with capital letters!`)
    }
})

program.parse() // for making sure that the incoming command is parsed first