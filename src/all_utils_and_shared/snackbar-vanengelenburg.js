//shared gegevens
module.exports={
  target:"http://www.snackbar-vanengelenburg.nl:5055",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p),
  namespace:"/snackbar-vanengelenburg",
  restaurantType:"cafetaria",
  hide:true
}

// utils
module.exports={
  target:"http://www.snackbar-vanengelenburg.nl:5055",
  changeFormat:(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p)
}
