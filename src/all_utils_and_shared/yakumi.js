//shared gegevens
module.exports={
  target:"http://www.yakumi.nl:5050",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p),
  namespace:"/yakumi-oud-beijerland",
  restaurantType:"japans",
  hide:true
}

// utils
module.exports={
  target:"http://www.yakumi.nl:5050",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p)
}
