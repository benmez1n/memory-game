let duration = 1000;
    blocksContainer = document.querySelector(".memory-game-cards"),
    blocks = Array.from(blocksContainer.children);
    orderRange = [...Array(blocks.length).keys()];
//All functions
shuffle = array=>{
    let current = array.length-1,
        temp,
        random;
    while(current>0){
        random = Math.floor(Math.random()*current);
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
        current--;
    }
    return array;
}
flip = (element) =>{
    element.classList.add("flipped");
    let allFlippedBlocks = blocks.filter(element=>element.classList.contains("flipped"));
    if(allFlippedBlocks.length === 2 ){
        stopClick();
        checkMatchBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
    }
   
}
stopClick = ()=>{
    blocksContainer.classList.add("no-click");
    setTimeout(()=>{
        blocksContainer.classList.remove("no-click");
    },duration)
}
checkMatchBlocks = (firstBlock,secondBlock)=>{
    let score = document.querySelector(".score span");
    if(firstBlock.dataset.name === secondBlock.dataset.name){
        firstBlock.classList.remove("flipped");
        secondBlock.classList.remove("flipped");
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        score.innerHTML = parseInt(score.innerHTML)+1;
    }
    else{
        setTimeout(()=>{
            firstBlock.classList.remove("flipped");
            secondBlock.classList.remove("flipped");
        },duration);
        score.innerHTML = parseInt(score.innerHTML)-1;
    }
}
//.............................
document.querySelector(".control-buttons button").onclick = ()=>{
    let playerName = prompt("Enter your name");
    if(playerName == null || playerName == "") document.querySelector(".name span").innerHTML = "Player";
    else {
        document.querySelector(".name span").innerHTML = playerName;
    }
    document.querySelector(".control-buttons").remove();
    blocks.forEach(element=>element.classList.add("flipped"));
    setTimeout(()=>{
        blocks.forEach(element=>element.classList.remove("flipped"));
    },500);
}
shuffle(orderRange);
blocks.forEach((element,index)=>{
    element.style.order = orderRange[index];
    element.addEventListener("click",()=>flip(element))
});