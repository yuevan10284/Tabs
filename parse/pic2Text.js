const fs = require('fs');
const Tesseract = require('tesseract.js');

// Function to extract text from image using Tesseract.js and write to a text file
async function extractTextFromImageAndWriteToFile(imagePath, outputFilePath) {
    try {
        const { data: { text } } = await Tesseract.recognize(
            imagePath,
            'eng',
            { logger: m => console.log(m) }
        );
        // Write extracted text to a text file
        fs.writeFileSync(outputFilePath, text.trim());
    } catch (error) {
        throw new Error('Text extraction and file writing failed:', error);
    }
}

// Function to parse items and prices from extracted text
function parseItemsAndPrices(text) {
    
    // const itemsAndPrices = text.match(/(item1|item2|item3): \$\d+(\.\d{2})?/g);
    // return itemsAndPrices;
    const itemsAndPrices = [];
    const itemRegex = /([A-Z\s]+)\s+(\d{12})\s+([\d.]+)/g; // Regex to match item name, UPC code, and price
    let match;
    while ((match = itemRegex.exec(text)) !== null) {
        const itemName = match[1].trim();
        const UPCCode = match[2];
        const price = parseFloat(match[3]);
        itemsAndPrices.push({ itemName, UPCCode, price });
    }
    return itemsAndPrices;
}
//testTextExtraction();  //for testing cam2text

// Function to parse items and prices from extracted text
function parseItemsAndPrices(text) {
    const itemsAndPrices = [];
    const itemRegex = /([A-Z\s&]+)\s+(\d+(?:\.\d+)?)/g; // Regex to match item name and price
    let match;
    while ((match = itemRegex.exec(text)) !== null) {
        const itemName = match[1].trim();
        const price = parseFloat(match[2]);
        // Exclude common irrelevant words such as "TRH", "X", "F", etc.
        if (!["TRH", "X", "F", "TAX", "A TEND", "CHANGE DUE", "ITEMS SOLD"].includes(itemName)) {
            itemsAndPrices.push({ itemName, price });
        }
    }

    // Identify missing items by comparing with known item names
    const knownItemNames = itemsAndPrices.map(item => item.itemName);
    const allItems = text.match(/[A-Z\s&]+(?=\s+\d+(?:\.\d+)?)/g) || [];
    const missingItems = allItems.filter(item => !knownItemNames.includes(item));
    if (missingItems.length > 0) {
        console.log(`Warning: ${missingItems.length} item(s) detected with prices but couldn't be fully detected. Please input manually.`);
    }

    return itemsAndPrices;
}




// Test the parsing function
const exampleText = `
give us feedback @ survey .waimart.com
Thank you! ID #:7QD2B31HZRS
No
Walma rt 7
702-639-1202 Mgr: SHIREEN
5940 LOSEE RD
NORTH LAS VEGAS NV 9081
ST# 04339 OP# 009046 TE# 45 TRH 08549
VINYL GLOVES 019339700848 11.72 X
AJAX DISHLIM 003500049863 2.96 X
ADVIL DUAL18 030573014718! 3.98 X
MCC/SCH PARS 005210000738 F 2. £1 !
VINYL GLOVES 01539 ror 265
.54
TAX 1 8-3rn 35136
visA TEND 35.36
BIT ARXK XKXY xxx
HS POVAL # 037179
REF # 122400480186
TRANS ID - 461224669734380
VALIDATION - HHRT
PAYMENT SERVICE - E
ALD A0000000980840
AAC A97E6FAD6D3076AE
TERMINAL # SC012072
08/12/21 11:36:18 -
CHANGE DUE 0. Ooanii=
# ITEMS SOLD 5
TC# 5312 0305 (836 2911 931
Lab VINAAMVAR
| Il Il You Can LL Every Day.
Low Prices 0ya1 11:36:18
Fr xxxCUSTOMER COPYxxx`;

const itemsAndPrices = parseItemsAndPrices(exampleText);
console.log('Parsed Items and Prices:', itemsAndPrices);


