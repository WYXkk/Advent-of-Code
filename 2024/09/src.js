let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('').map(x=>parseInt(x)).map((x,ind)=>new Array(x).fill((ind%2)?0:ind/2+1)).reduce((a,b)=>a.concat(b),[])
let c=[].concat(b)
let i=0,j=c.length-1;
while(true){
	while(c[i]!=0&&i<j) i++;if(i==j)break;
	while(c[j]==0&&i<j) j--;if(i==j)break;
	let tmp=c[i];c[i]=c[j];c[j]=tmp;
}
let ans=0;
for(let i=0;i<c.length;i++)ans+=Math.max(0,c[i]-1)*i;
console.log(ans)
let b2=a.split('').map(x=>parseInt(x)).map((x,ind)=>{return {id:(ind%2)?-1:ind/2,size:x,fill:[]}})
for(let j=b2.length-1;j>=0;j--)if(b2[j].id>=0){
	for(let i=0;i<j;i++)if(b2[i].id<0){
		if(b2[i].size>=b2[j].size){
			b2[i].size-=b2[j].size;
			b2[i].fill.push({id:b2[j].id,size:b2[j].size});
			b2[j].id=-1;
			break;
		}
	}
}
let c2=b2.map(x=>{
	if(x.id>=0) return new Array(x.size).fill(x.id);
	else return x.fill.map(y=>new Array(y.size).fill(y.id)).reduce((a,b)=>a.concat(b),[]).concat(new Array(x.size).fill(0));
}).reduce((a,b)=>a.concat(b),[])
let ans2=0;
for(let i=0;i<c2.length;i++)ans2+=c2[i]*i;
console.log(ans2)