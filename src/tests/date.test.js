const moment = require('moment')

const fecha = moment('2021-03-06 18:35:04.175971-06', "YYYY-MM-DD H:mm:ss.SSSSSSZ").format('DD/MM/YY h:mm:ss a')

console.log(fecha)

var day = moment.unix(1318781876).format('DD/MM/YY h:mm:ss a');

console.log(day)


const fecha2 = moment('2021-03-06 18:35:04.175971-06', "YYYY-MM-DD H:mm:ss.SSSSSSZ").unix()

console.log(fecha2)
