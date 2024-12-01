let a=document.body.innerText.split('\n')[0];
hash=(str)=>{
    let ret=0;
    for(let i=0;i<str.length;i++){
        ret+=str.charCodeAt(i);
        ret=ret*17%256;
    }
    return ret;
}
console.log(`Part 1: ${a.split(',').map(hash).reduce((a,b)=>a+b,0)}`);

res=a.split(',')
box=[];for(let i=0;i<256;i++)box.push([]);
for(let i in res){
    if(res[i].indexOf('=')!=-1){
        let u=res[i].split('=');
        let x=u[0],y=parseInt(u[1]);
        let id=hash(x);
        let pos=box[id].findIndex(t=>t.x==x);
        if(pos==-1) box[id].push({x:x,y:y});
        else box[id][pos].y=y;
    }
    else
    {
        let u=res[i].split('-');
        let x=u[0];
        let id=hash(x);
        box[id]=box[id].filter(t=>t.x!=x);
    }
}

let ans=0;
for(let i=0;i<256;i++){
    for(let j=0;j<box[i].length;j++){
        ans+=(i+1)*(j+1)*box[i][j].y;
    }
}
console.log(`Part 2: ${ans}`);