"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const url = 'https://www.vivareal.com.br/venda/rio-grande-do-norte/natal/apartamento_residencial/'; // URL we're scraping
const AxiosInstance = axios_1.default.create(); // Create a new Axios Instance
AxiosInstance.get(url)
    .then(response => {
    const html = response.data; // Get the HTML from the HTTP request
    const $ = cheerio_1.default.load(html); // Load the HTML string into cheerio
    const statsTable = $('.statsTableContainer > tr'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
    const anunciosImoveis = [];
    statsTable.each((i, elem) => {
        const titulo = $(parseInt($('section > div > h1').find('titulo : strong').text()));
        const endereco = $(elem).find('.endereco > strong').text();
        const taxa = parseFloat($(elem).find('.taxa > strong').text());
        const area = parseInt($(elem).find('.mainStat').text());
        const suites = parseInt($(elem).find('suites > strong').text());
        const banheiros = parseInt($(elem).find('banheiros > strong').text());
        const estacionamento = parseInt($(elem).find('estacionamento > strong').text());
        const preco = parseInt($(elem).find('preco > strong').text());
        anunciosImoveis.push({
            titulo,
            endereco,
            taxa,
            area,
            suites,
            banheiros,
            estacionamento,
            preco
        });
    });
    console.log(anunciosImoveis);
})
    .catch(console.error); // Error handling
//# sourceMappingURL=index.js.map