//shared gegevens
module.exports={
  target:"http://www.chinagardenrucphen.nl:5010",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p),
  namespace:"/china-garden",
  restaurantType:"chinees",
  hide:true
}

// utils
module.exports={
  target:"http://www.chinagardenrucphen.nl:5010",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p)
}
