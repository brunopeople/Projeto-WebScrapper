import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.vivareal.com.br/venda/rio-grande-do-norte/natal/apartamento_residencial/'; // URL we're scraping
const AxiosInstance = axios.create(); // Create a new Axios Instance

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
      const $ = cheerio.load(html); // Load the HTML string into cheerio
      const statsTable: cheerio = $('.statsTableContainer > tr'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
      const anunciosImoveis: ImoveisData[] = [];

      statsTable.each((i, elem) => {
        const titulo: string = $(elem).find('.titulo > strong').text(); 
        const endereco: string = $(elem).find('.endereco > strong').text(); 
        const taxa: number = parseFloat($(elem).find('.taxa > strong').text()); 
        const area: number = parseInt($(elem).find('.mainStat').text()); 
        const suites:number = parseInt($(elem).find('suites > strong').text());
        const banheiros: number = parseInt($(elem).find('banheiros > strong').text());
        const estacionamento: number = parseInt($(elem).find('estacionamento > strong').text());
        const preco: number = parseInt($(elem).find('preco > strong').text());


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
      })

      console.log(anunciosImoveis);
    }
  )
  .catch(console.error); // Error handling