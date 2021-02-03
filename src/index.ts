import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.vivareal.com.br/venda/rio-grande-do-norte/natal/apartamento_residencial/'; // URL we're scraping
const AxiosInstance = axios.create(); // Create a new Axios Instance

let anunciosImoveis = [];

// This is the structure of the player data we recieve
interface ImoveisData {
  titulo: string; 
  endereco: string;
  taxa: number;
  area: number;
  suites: number;
  banheiros: number;
  estacionamento: number;
  preco: number;
}


AxiosInstance.get(url)
  .then( 
    response => {
      const html = response.data; // Get the HTML from the HTTP request
      console.log(html);
      const $ = cheerio.load(html); // Load the HTML string into cheerio
      const statsTable: cheerio.Cheerio = $('.js-card-title > div'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
      const anunciosImoveis: ImoveisData[] = [];

      statsTable.each((i,elem) => {
        const titulo: string = $(elem).find('span.js-card-title').text();
        const endereco: string = $(elem).find('span.js-property-card-address').text();
        const taxa: number = parseFloat($(elem).find('div.js-property-card-prices').text().trim().slice(2));
        const area: number = parseInt($(elem).find('span-js-property-card-detail-area').text()); 
        const suites:number = parseInt($(elem).find('span.property-card__detail-value.js-property-card-value').text());
        const banheiros: number = parseInt($(elem).find('span.property-card__detail-value.js-property-card-value').text());
        const estacionamento: number = parseInt($(elem).find('span.property-card__detail-value js-property-card-value').text());
        const preco: number = parseInt($(elem).find('div.property-card__price js-property-card-prices js-property-card__price-small').text());


        anunciosImoveis.push({
          titulo,
          endereco,
          taxa,
          area,
          suites,
          banheiros,
          estacionamento,
          preco
        })
        const json2csvParser = new Parser();
        const csv = json2csvParser.parser(anunciosImoveis);
        console.log(anunciosImoveis);
        fs.writeFileSync('/dados-imoveis.csv', csv, 'utf8');
      })

      console.log(anunciosImoveis);
    }
  )
  .catch(console.error); // Error handling0