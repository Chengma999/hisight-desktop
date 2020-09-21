// utils
module.exports={
  target:"http://www.cafetariafifty-nine.nl",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p)
}
