let a = document.body.innerText.trim();
b=a.split('\n\n');c=b[1];b=b[0];
b=b.split('\n').map(x=>x.split('|').map(y=>parseInt(y)))
c=c.split('\n').map(x=>x.split(',').map(y=>parseInt(y)))
let ans=0;for(let i in c){
    let n=c[i].length;let flg=true;
    for(let j=0;j<n;j++) for(let k=j+1;k<n;k++) if(b.filter(x=>x[0]==c[i][k]&&x[1]==c[i][j]).length>0) flg=false;
    if(flg) ans+=c[i][(n-1)/2];
}
console.log(ans);
d=c.filter(x=>{
    let n=x.length;
    for(let j=0;j<n;j++) for(let k=j+1;k<n;k++) if(b.filter(y=>y[0]==x[k]&&y[1]==x[j]).length>0) return true;
    return false;
})
ans2=0;for(let i in d){
    let bucket=new Array(100).fill(0);
    for(let j in b)if(d[i].indexOf(b[j][0])!=-1)if(d[i].indexOf(b[j][1])!=-1)bucket[b[j][1]]++;
    let queue=[].concat(d[i]);let res=[];
    while(queue.length){let a=queue[0];queue=queue.slice(1);if(bucket[a]!=0)continue;if(res.indexOf(a)!=-1)continue;res.push(a);let x=b.filter(y=>y[0]==a&&d[i].indexOf(y[1])!=-1);for(let j in x){bucket[x[j][1]]--;queue.push(x[j][1]);}}
    ans2+=res[(res.length-1)/2];
}
console.log(ans2);