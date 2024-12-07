let a = document.body.innerText.trim();
let b=a.split('\n').map(x=>x.split(': ')).map(x=>{return{res:parseInt(x[0]),num:x[1].split(' ').map(y=>parseInt(y))}});
console.log(b.filter(x=>{
    let list=[x.res];
    for(let i=x.num.length-1;i>0;i--){
        let newlist=[];
        for(let j in list){
            if(list[j]>x.num[i]) newlist.push(list[j]-x.num[i]);
            if(list[j]%x.num[i]==0) newlist.push(list[j]/x.num[i]);
        }
        list=newlist;
    }
    return list.indexOf(x.num[0])!=-1;
}).map(x=>x.res).reduce((a,b)=>a+b,0))
console.log(b.filter(x=>{
    let list=[x.res];
    for(let i=x.num.length-1;i>0;i--){
        let newlist=[];
        for(let j in list){
            if(list[j]>x.num[i]) newlist.push(list[j]-x.num[i]);
            if(list[j]%x.num[i]==0) newlist.push(list[j]/x.num[i]);
            let s=list[j].toString(),t=x.num[i].toString();
            if(s.slice(-t.length)==t) newlist.push(parseInt(s.slice(0,-t.length)));
        }
        list=newlist;
    }
    return list.indexOf(x.num[0])!=-1;
}).map(x=>x.res).reduce((a,b)=>a+b,0))