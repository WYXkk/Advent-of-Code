let a=document.body.innerText.split('\n');a.length--;

let b=a.slice(2);
let c=b.map(x=>{return {node:x.slice(0,3),left:x.slice(7,10),right:x.slice(12,15)}});
let getC=x=>a[0][(x-1)%a[0].length];

if(!part2only){

let cur='AAA';
let step=0;
while(cur!='ZZZ'){
	++step;
	let t=c.find(x=>x.node==cur);
	if(getC(step)=='L') cur=t.left;
	else cur=t.right;
}
console.log(`Part 1: ${step}`);

}


let list=c.map(x=>x.node);
cur=list.filter(x=>x[2]=='A');
step=0;

strToNum=(str)=>{
	let base='A'.charCodeAt(0),a=str.charCodeAt(0),b=str.charCodeAt(1),c=str.charCodeAt(2);
	return (a-base)*26*26+(b-base)*26+(c-base);
}
numToStr=(num)=>{
	let base='A'.charCodeAt(0);
	let a=Math.floor(num/26/26),b=Math.floor(num/26)%26,c=num%26;
	return String.fromCharCode(a+base,b+base,c+base);
}

let mp=[];for(let i=0;i<26*26*26;i++) mp.push(0);
for(let i in c)mp[strToNum(c[i].node)]={left:strToNum(c[i].left),right:strToNum(c[i].right)};
cur=cur.map(strToNum);

for(let i in cur){
	let now=cur[i];
	let met=[];
	for(let step=1;step<=1e6;step++)
	{
		let t=mp[now];
		if(getC(step)=='L') now=t.left;
		else now=t.right;
		if(now%26==25) met.push(step);
	}
	console.log(`${numToStr(cur[i])} get to end at these step:${met}`)
}