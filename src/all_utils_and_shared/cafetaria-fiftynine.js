//shared gegevens
module.exports={
  target:"http://www.cafetariafifty-nine.nl:5060",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p),
  namespace:"/cafetaria-fiftynine",
  restaurantType:"japans",
  hide:true
}

// utils
module.exports={
  target:"http://www.cafetariafifty-nine.nl:5060",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p)
}
