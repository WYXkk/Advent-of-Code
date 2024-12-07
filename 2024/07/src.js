let a = document.body.innerText.trim();
let b=a.split('\n').map(x=>x.split(': ')).map(x=>{return{res:parseInt(x[0]),num:x[1].split(' ').map(y=>parseInt(y))}});
console.log(b.filter(x=>{
    for(let i=0;i<2**(x.num.length-1);i++){
        let tmp=x.num[0];
        for(let j=1;j<x.num.length;j++)tmp=((i>>(j-1))&1)?(tmp+x.num[j]):(tmp*x.num[j]);
        if(tmp==x.res) return true;
    }
    return false;
}).map(x=>x.res).reduce((a,b)=>a+b,0))
console.log(b.filter(x=>{
    for(let i=0;i<3**(x.num.length-1);i++){
        let tmp=x.num[0];
        for(let j=1;j<x.num.length;j++){
            let opt=Math.floor(i/3**(j-1))%3;
            if(opt==0) tmp=tmp+x.num[j];
            if(opt==1) tmp=tmp*x.num[j];
            if(opt==2) tmp=parseInt(`${tmp}${x.num[j]}`);
        }
        if(tmp==x.res) return true;
    }
    return false;
}).map(x=>x.res).reduce((a,b)=>a+b,0))