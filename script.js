const sudoArray = [
  "53--7----6--195----98----6-8---6---34--8-3--17---2---6-6----28----419--5----8--79",
  "111111111111111111111111111111111111111111111111111111111111111111111111111111111",
];

function startGame() {
   let boardNumber;
   boardNumber = sudoArray[0];
   sudoBoard(boardNumber);
   countDown();
}

function countDown(){
    let lvTimer=240; //Setting it for 4 minutes -- 240 seconds

   timer=setInterval(()=>{
       lvTimer--;
    
        selectId("cur-time").innerHTML=minuteSecondTimer(lvTimer);
       

   },1000);
}

function minuteSecondTimer(time){
    
    let mins=Math.floor(time/60);
    if(mins < 10 ) mins = "0" + mins;
    
    let sc= time % 60;
    if ((sc<10)) 
    sc="0" + sc;
     
    return mins + ":" + sc;



}

function sudoBoard(numbers){
    let idCount=0;
    //create 81 tiles
    for(let i=0;i<81;i++){
        let numberCube=document.createElement("p");
        if(numbers.charAt(i)!="-"){
            //set tile text to correct number
            numberCube.textContent=numbers.charAt(i);
        }
        numberCube.id=idCount;
        idCount++;
        numberCube.classList.add("numbers");
        selectId("Game").appendChild(numberCube);


    }
}

//generalized id and query selector
function selectId(id) {
  return document.getElementById(id);
}

function querySel(selector){
    return document.querySelector(selector);
}

function querySelAll(selector){
    return document.querySelectorAll(selector);
}



