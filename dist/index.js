"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const url = 'https://www.vivareal.com.br/venda/rio-grande-do-norte/natal/apartamento_residencial/'; // URL we're scraping
const AxiosInstance = axios_1.default.create(); // Create a new Axios Instance
let anunciosImoveis = [];
AxiosInstance.get(url)
    .then(response => {
    const html = response.data; // Get the HTML from the HTTP request
    console.log(html);
    const $ = cheerio_1.default.load(html); // Load the HTML string into cheerio
    const statsTable = $('.js-card-title > div'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
    const anunciosImoveis = [];
    statsTable.each((i, elem) => {
        const titulo = $(elem).find('span.js-card-title').text();
        const endereco = $(elem).find('span.js-property-card-address').text();
        const taxa = parseFloat($(elem).find('div.js-condo-price').text().trim().slice(2));
        const area = parseInt($(elem).find('li.js-property-card-area').text());
        const suites = parseInt($(elem).find('li.js-property-detail-rom').text());
        const banheiros = parseInt($(elem).find('span.js-property-card-value').text());
        const estacionamento = parseInt($(elem).find('span.js-property-card-value').text());
        const preco = parseInt($(elem).find('div.js-property-card-prices').text());
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
    .catch(console.error); // Error handling0
//# sourceMappingURL=index.js.map