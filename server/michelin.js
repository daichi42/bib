const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);
  var names = [];

  for (let i =1;i<=41;i++){
      var nam =$('div:nth-child('+i+') > div > div.card__menu-content.js-match-height-content > h5 > a').text();
      if (nam.length != 0 )
      {
        var name = nam.split('\n');
        names.push(name[1].substring(16));
      }
  }


  return names;
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
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
