export function show(setter){
    setter(true)
    setTimeout(() =>{
      setter(false)
    }, 2000)
}

export function checkWin(correct, wrong, word){
  let status = "win"

  // checks for wins
  word.split("").forEach(letter => {
    if(!correct.includes(letter)){
      status = ""
    }
  });

  // checks for loss
  if(wrong.length === 6){
    status = "lose"
  }
  return status;
}