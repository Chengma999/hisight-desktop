//shared gegevens
module.exports={
  target:"http://www.cafetaria-crabbehof.nl:5045",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p),
  namespace:"/cafetaria-crabbehof",
  restaurantType:"cafetaria"
}

// utils
module.exports={
  target:"http://www.cafetaria-crabbehof.nl:5045",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p)
}
