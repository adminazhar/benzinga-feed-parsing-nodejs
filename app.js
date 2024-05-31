var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

async function fetchAndParseXML() {
  try {
    // Fetch the XML data from the URL
    const response = await axios.get('https://www.benzinga.com/topic/cannabis/feed');
    const xmlData = response.data;

    // Initialize the parser with options to handle namespaces and other settings
    const parser = new XMLParser({ ignoreAttributes: false });
    const jsonObj = parser.parse(xmlData);

    // Access the items in the channel
    const items = jsonObj.rss.channel.item;

    // Check if items is an array or a single object and normalize it to an array
    const itemsArray = Array.isArray(items) ? items : [items];

    // Log the title of each item
    itemsArray.forEach((item, index) => {
      console.log(`Title ${index + 1}: ${item.title}`);
    });
  } catch (error) {
    console.error('Error fetching or parsing XML:', error);
  }
}

fetchAndParseXML();
