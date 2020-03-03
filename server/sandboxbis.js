const restaurateur = require('./restaurateur');
const fs = require('fs');

async function sandboxbis (searchLink = 'https://www.maitresrestaurateurs.fr/annuaire/recherche')
 {
   for(let i = 1;i<156;i++)

    try {

      const restaurant = await restaurateur.scrapeRestaurant(i);
      let data = JSON.stringify(restaurant);
      fs.writeFileSync('maitresrestaurateurs.json',data);
      console.log(restaurant);
      console.log('done');
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
    process.exit(0);
}

const [,, searchLink] = process.argv;


sandboxbis(searchLink);
