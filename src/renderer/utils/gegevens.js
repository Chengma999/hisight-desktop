// utils
module.exports={
  target:"http://www.cafetaria-crabbehof.nl:5045",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p)
}
