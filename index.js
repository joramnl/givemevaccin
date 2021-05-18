const rp = require('request-promise');
const cheerio = require('cheerio');
const push = require('pushsafer-notifications');
const getColors = require('get-image-colors');
require('dotenv').config();

const url = 'https://www.prullenbakvaccin.nl';

let firstStartup = true;
let data = {};

gatherData();
setInterval(gatherData, 60 * 1000);

function gatherData() {

    rp(url)
      .then(async function(html){

        let _data = {};
    
        let $ = cheerio.load(html, {xmlMode: false});
        let aantalLocaties = $('.text-center > p > b').get()[0].children[0].data;
        let map = $('#map').css("background-image");
        let mapPartialUrl = map.match(/'(.*?)'/g)[0];
        let mapUrl = url + mapPartialUrl.replace(/'/g, "")

        let image = await rp({
            url: mapUrl,
            encoding: null
        });
        let imageBuffer = Buffer.from(image);

        let colors = await getColors(imageBuffer, 'image/png');

        _data.colors = colors.map(color => color.hex());

        _data.locaties = aantalLocaties;
        
        if (firstStartup) {
            data = _data;
            console.log(_data);
            firstStartup = false;
        } else {
            if (_data.locaties == data.locaties) log("Geen nieuwe locaties. Totaal: " + _data.locaties +"!");

            if (_data.locaties > data.locaties) log("Er is een nieuwe locatie. Totaal: " + _data.locaties +"!", true);
            if (_data.locaties < data.locaties) log("Er is een  locatie weg.", true);

            if (_data.colors.length == data.colors.length && _data.colors.every((v) => data.colors.indexOf(v) >= 0)) {
                log("Geen nieuwe vaccins");
            }  else {
                log("Er zijn mogelijk vaccins beschikbaar", true);
            }
            console.log(_data);

            data = _data;
        }

      })
      .catch(function(err){
        console.error(err);
      });
}

function log(message, send = false) {

    console.log(message);

    if (send) {

        let p = new push({
            k: process.env.PUSHSAFER_KEY,
            debug: true
        })

        let msg = {
            t: "Prullenbakvaccin",
            m: message,
            u: url,
            ut: 'Bezoek website',
            pr: '2'
        };

        p.send( msg, function( err, result ) {
            if (err) {
                console.log( 'ERROR:', err );
            }
        });

    }

}