const axios = require('axios');
const cheerio = require('cheerio');
var querystring = require('querystring');
const names = [];

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
 const parse = data => {
   const $ = cheerio.load(data);
   $('div.single_libel').each((i, element) => {
         const nam = $(element).text();
         const nami = nam.split('(');
         const name = nami[0].split('\n');
         names.push(name[2].substring(12));
     })
   return names;
 };

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
 module.exports.scrapeRestaurant = async page => {
   const payload = {
       'page': page,
       'request_id': 'f6907c06d24eeddec2bf7b7f3d343a24'
   };

   const options = {
       'url': 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult',
       'method': 'POST',
       'headers': {'content-type': 'application/x-www-form-urlencoded'},
       'data': querystring.stringify(payload)
   };

   const response = await axios(options);
   const {data, status} = response;

   if (status >= 200 && status < 300) {
       return parse(data);
   }

   console.error(status);

   return null;
 };

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
  return [];
};
