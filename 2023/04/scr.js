let a=document.body.innerText.split('\n');a.length--;
let b=a.map(t=>t.slice(t.indexOf(':')+2).split(' | '));
let c=b.map(t=>t.map(w=>{u=[];for(let i=1;i<=(w.length+1)/3;i++) u.push(parseInt(w[3*i-3]+w[3*i-2]));return u;}));
let d=c.map(x=>x[1].filter(y=>x[0].indexOf(y)!=-1).length);
let p1=d.map(x=>x==0?0:2**(x-1)).reduce((a,b)=>a+b,0);
let e=[];for(let i in d) e.push(1);
for(let i in d){for(let j=1;j<=d[i];j++) e[parseInt(i)+j]+=e[i];}
let p2=e.reduce((a,b)=>a+b,0);
console.log(`Part 1: ${p1}\nPart 2: ${p2}`);