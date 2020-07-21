import  moment from 'moment';
const takeTime =(argArr,orderType)=>{
 const arr= argArr.map( item=>{
    return item.value
    }
  )
  let newarr
  const date=moment()
  // const format = 'hh:mm:ss',
        // currenttime = moment(moment(),format),
        // beforeTime = moment(argArr[0].label, "HH:mm"),
        // afterTime = moment(argArr[argArr.length-1].label, "HH:mm");
  const htime = date.get('hour') + date.get('minute')/60 +( orderType==="bezorgen"? 0.7:0.45)
  let arr1 = arr.slice(0)
  arr1.push(htime)
  arr1.sort((a,b)=>a-b)
  const indexNum = arr1.indexOf(htime)+1
  // console.log(indexNum)
  const arr2 = arr1.slice(indexNum)
  newarr = arr2.map(time=>{
  let val= moment((Math.floor(time)*100+(time-Math.floor(time))*60),'HHmm').format('HH:mm')
   const argFound= argArr.find(argtime=>argtime.value===time)
  return{value:val,text:val,key:val,available:argFound.available}

})
//   if (currenttime.isBetween(beforeTime, afterTime)){

//       newarr.unshift({value:'z.s.m',text:'Zo snel mogelijk',key:'zsm'})
// }
  return newarr
}
export default takeTime


export const daysOptions=[
  {value:0,text:"zondag"},
  {value:1,text:"maandg"},
  {value:2,text:"dinsdag"},
  {value:3,text:"woensdag"},
  {value:4,text:"donderdag"},
  {value:5,text:"vrijdag"},
  {value:6,text:"zaterdag"},
  {value:9,text:"NIET SLUITEN"},

]
