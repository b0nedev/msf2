function randNDigits(repeat){
  let nDigits = 1;
  let randNum = 0;
  try{
    for(i=0;i<repeat;i++){
      nDigits *= 10;
    }
    do{
      randNum = Math.round(Math.random() * nDigits);
    }while(randNum < (nDigits/10));
    return randNum;
  }
  catch(exception){
    console.log(exception);
    return 0;
  }
}

function rand5Digits(){
  return randNDigits(5);
}

exports.randNDigits = randNDigits;
exports.rand5Digits = rand5Digits;
