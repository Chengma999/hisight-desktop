//shared gegevens
module.exports={
  target:"http://www.nieuwpekingraalte.nl:5000",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p),
  namespace:"/dva-np",
  restaurantType:"chinees",
  hide:true
}

// utils
module.exports={
  target:"http://www.nieuwpekingraalte.nl:5000",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p)
}
