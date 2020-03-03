/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const fs = require('fs');
const bib = [];

async function sandbox () {
  for(let i = 1;i<16;i++)
  {

    try {
      var searchLink = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/'+i;
      console.log(`🕵️‍♀️  browsing ${searchLink} source`);

      const restaurant = await michelin.scrapeRestaurant(searchLink);
      bib.push(restaurant);
      console.log('done');
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
    }
    console.log(bib);
    let data = JSON.stringify(bib);
    fs.writeFileSync('bib.json',data);
    process.exit(0);

}

const [,, searchLink] = process.argv;

sandbox(searchLink);
