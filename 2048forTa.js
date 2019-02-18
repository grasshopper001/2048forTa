function combineValue(value,i,j){
    var oTable=document.getElementById("grid-canvas");
    if(value===0){
        oTable.rows[i].cells[j].innerHTML="";
        return;
    }
    oTable.rows[i].cells[j].innerHTML=`<img src=./img/${value}.jpg alt="img lost"/>`
}

function welcome(){
    window.alert("hello guys! welcome to 2048 for Ta!");
    init();
    game();
}

var grid=Array(4);

function init(){
    for(let i=0;i<4;i++){
        grid[i]=Array(4);
        for(let j=0;j<4;j++){
            grid[i][j]=0;
        }
    }
}

function game(){
    var row;
    var col;
    do{
        row=Math.floor(Math.random()*4);
        col=Math.floor(Math.random()*4);        
    }while(grid[row][col]!==0)
    grid[row][col]=2;
    console.log("new item added:");
    console.log(`${row},${col}`);
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            combineValue(grid[i][j],i,j);
        }
    }
    if(isFull()){
        window.alert("you are not certificated mogician yet.");
        init();
    }
}

function isFull(){
    var ret_value=0;
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(grid[i][j]===0) ret_value=1;
        }
    }
    return !ret_value;
}

var illegalStep=true;

function press(e){
    switch(e.keyCode){
        case 37:
            moveLeft();
        break;
        case 38:
            moveUp();
        break;
        case 39:
            moveRight();
        break;
        case 40:
            moveDown();
        break;
        default:
            illegalStep=true;
        break;
    }
    if(illegalStep){
        console.log("illegalStep");
    }
    if(!illegalStep){
        updateBoard();
        illegalStep=true;
        setTimeout(game(),1000);
    }
}

var score=0;

function updateBoard(){
    document.getElementById("score").innerHTML=score;
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            combineValue(grid[i][j],i,j);
        }
    }
    console.log("updateBoard:");
    console.log(grid);
}

function moveLeft(){
    console.log("moveLeft");
    for(let i=0;i<4;i++){
        var row=Array();
        for(let j=0;j<4;j++){
            if(grid[i][j]!==0) row.push(grid[i][j]);
        }
        if(row.length<4) {
            for(let j=0;j<4;j++){
                if(j<row.length) {
                    if(grid[i][j]!==row[j]) illegalStep=false;
                    grid[i][j]=row[j];
                }
                else grid[i][j]=0;
            }
        }
        L2:
        for(let j=0;j<3;j++){
            if(grid[i][j]===0) continue L2;
            if(grid[i][j]===grid[i][j+1]){
                grid[i][j]=grid[i][j]*2;
                grid[i][j+1]=0;
                score+=grid[i][j];
                illegalStep=false;
            }
        }
        row=Array();
        for(let j=0;j<4;j++){
            if(grid[i][j]!==0) row.push(grid[i][j]);
        }
        if(row.length<4) {
            for(let j=0;j<4;j++){
                if(j<row.length) grid[i][j]=row[j];
                else grid[i][j]=0;
            }
        }
    }
}

function moveRight(){
    console.log("moveRight");
    for(let i=0;i<4;i++){
        var row=Array();
        for(let j=3;j>=0;j--){
            if(grid[i][j]!==0) row.push(grid[i][j]);
        }
        if(row.length<4) {
            for(let j=3;j>=0;j--){
                if((3-j)<row.length) {
                    if(grid[i][j]!==row[3-j]) illegalStep=false;
                    grid[i][j]=row[3-j];
                }
                else grid[i][j]=0;
            }
        }
        L2:
        for(let j=3;j>0;j--){
            if(grid[i][j]===0) continue L2;
            if(grid[i][j]===grid[i][j-1]){
                grid[i][j]=grid[i][j]*2;
                grid[i][j-1]=0;
                score+=grid[i][j];
                illegalStep=false;
            }
        }
        row=Array();
        for(let j=3;j>=0;j--){
            if(grid[i][j]!==0) row.push(grid[i][j]);
        }
        if(row.length<4) {
            for(let j=3;j>=0;j--){
                if((3-j)<row.length) grid[i][j]=row[3-j];
                else grid[i][j]=0;
            }
        }
    }
}

function moveUp(){
    console.log("moveUp");
    for(let j=0;j<4;j++){
        var row=Array();
        for(let i=0;i<4;i++){
            if(grid[i][j]!==0) row.push(grid[i][j]);
        }
        if(row.length<4) {
            for(let i=0;i<4;i++){
                if(i<row.length) {
                    if(grid[i][j]!==row[i]) illegalStep=false;
                    grid[i][j]=row[i];
                }
                else grid[i][j]=0;
            }
        }
        L2:
        for(let i=0;i<3;i++){
            if(grid[i][j]===0) continue L2;
            if(grid[i][j]===grid[i+1][j]){
                grid[i][j]=grid[i][j]*2;
                grid[i+1][j]=0;
                score+=grid[i][j];
                illegalStep=false;
            }
        }
        row=Array();
        for(let i=0;i<4;i++){
            if(grid[i][j]!==0) row.push(grid[i][j]);
        }
        if(row.length<4) {
            for(let i=0;i<4;i++){
                if(i<row.length) grid[i][j]=row[i];
                else grid[i][j]=0;
            }
        }
    }
}

function moveDown(){
    console.log("moveDown");
    for(let j=0;j<4;j++){
        var row=Array();
        for(let i=3;i>=0;i--){
            if(grid[i][j]!==0) row.push(grid[i][j]);
        }
        if(row.length<4) {
            illegalStep=false;
            for(let i=3;i>=0;i--){
                if((3-i)<row.length) {
                    if(grid[i][j]!==row[3-i]) illegalStep=false;
                    grid[i][j]=row[3-i];
                }
                else grid[i][j]=0;
            }
        }
        L2:
        for(let i=3;i>0;i--){
            if(grid[i][j]===0) continue L2;
            if(grid[i][j]===grid[i-1][j]){
                grid[i][j]=grid[i][j]*2;
                grid[i-1][j]=0;
                score+=grid[i][j];
                illegalStep=false;
            }
        }
        row=Array();
        for(let i=3;i>=0;i--){
            if(grid[i][j]!==0) row.push(grid[i][j]);
        }
        if(row.length<4) {
            for(let i=3;i>=0;i--){
                if((3-i)<row.length) grid[i][j]=row[3-i];
                else grid[i][j]=0;
            }
        }       
    }
}