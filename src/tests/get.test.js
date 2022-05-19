const myArray = [{ _id: 'closed', totalEarnings: 23493262 },
{ _id: 'reversed', totalEarnings: 16333 },
{ _id: 'pending', totalEarnings: 34764 },
{ _id: 'funding-user', totalEarnings: 15372 },
{ _id: 'funding', totalEarnings: 24313 }
]

for (let i = 0; i < myArray.length; i++) {
  if(myArray[i]._id==='closed'){
    console.log(`Encontrado`)
  }
}