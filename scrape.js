var request = require('sync-request')
var cheerio = require('cheerio')

function parseNetrunnerHTML(string) {
  return string
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, ' / ')
    .replace(/<span class="icon icon-click"><\/span>/g, '🕖')
    .replace(/<span class="icon icon-credit"><\/span>/g, '⬡')
    .replace(/<span class="icon icon-subroutine"><\/span>/g, '↳')
    .replace(/<span class="icon icon-trash"><\/span>/g, '🗑')
    .replace(/<span class="icon icon-link"><\/span>/g, '⧉')
    .replace(/<strong>/g, '')
    .replace(/<\/strong>/g, '')
    .replace(/<sup>/g, ' ')
    .replace(/<\/sup>/g, ' ')
    .replace(/&#x2013;/g, '-')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
}

module.exports = {
  nrdb: (card) => {
    url = 'https://netrunnerdb.com/find/?q='+card

    var name, type, keywords, prop, text, flavor, faction, illustrator, set

    html = request('GET', url).body

    $ = cheerio.load(html)

    name = $('.card-title a').text()

    if(name.trim() == '') return "ERR: Card not found or multiple cards found (be more specific)."

    type = $('.card-type').text()
    keywords = $('.card-keywords').text()
    prop = $('.card-prop').text().slice(2).trim()
    text = parseNetrunnerHTML($('.card-text').html().trim())
    flavor = $('.card-flavor').text().trim()

    collector = $('.card-illustrator').text().split("•")

    if(collector[0]) faction = collector[0].trim()
    else faction = ""
    if(collector[1]) illustrator = collector[1].trim()
    else illustrator = ""
    if(collector[2]) set = collector[2].trim()
    else set = ""

    output = name + " -- " + type + keywords +" / "+ prop + " ------ " + text + flavor + " --- " + faction + " / " + illustrator + " / " + set
    return output
  }
}
