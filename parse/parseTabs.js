const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');

// Asynchronous function to extract text from an image using Tesseract.js
async function extractTextFromImage(imagePath) {
    try {
        const { data: { text } } = await Tesseract.recognize(
            imagePath,
            'eng',
            { logger: m => console.log(m) }
        );
        return text.trim();
    } catch (error) {
        throw new Error(`Text extraction failed: ${error}`);
    }
}

// Function to parse items and prices from extracted text
function parseItemsAndPrices(text) {
    const itemsAndPrices = [];
    const itemRegex = /([A-Z\s&]+)\s+(\d+\.\d+|\d+)/g; // Regex to match item name and price
    let match;
    while ((match = itemRegex.exec(text)) !== null) {
        const itemName = match[1].trim();
        const price = parseFloat(match[2]);
        // Exclude common irrelevant words such as "TRH", "X", "F", etc.
        if (!["TRH", "X", "F", "TAX", "A TEND", "CHANGE DUE", "ITEMS SOLD"].includes(itemName)) {
            itemsAndPrices.push({ itemName, price });
        }
    }
    return itemsAndPrices;
}

// Asynchronous function to create a directory
async function createDirectory(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
}

// Asynchronous function to process all JPEG files in a folder
async function processJPEGFilesInFolder(folderPath) {
    try {
        const extractedTextDirectory = path.join(folderPath, 'extractedText');
        await createDirectory(extractedTextDirectory);

        const files = fs.readdirSync(folderPath);
        for (const file of files) {
            if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
                const imagePath = path.join(folderPath, file);
                const extractedText = await extractTextFromImage(imagePath);
                const extractedTextFilePath = path.join(extractedTextDirectory, `${file.split('.')[0]}.txt`);
                fs.writeFileSync(extractedTextFilePath, extractedText);

                const itemsAndPrices = parseItemsAndPrices(extractedText);
                const parsedItemsFilePath = path.join(extractedTextDirectory, `${file.split('.')[0]}_parsed.txt`);
                fs.writeFileSync(parsedItemsFilePath, JSON.stringify(itemsAndPrices, null, 2));

                console.log(`Processed ${file}: Extracted text and parsed items written to files.`);
            }
        }
    } catch (error) {
        console.error(`Error processing files in folder: ${error.message}`);
    }
}

// Specify the folder containing the JPEG files
const folderPath = './receipts';

// Process all JPEG files in the folder
processJPEGFilesInFolder(folderPath);
