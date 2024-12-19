Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n\n');
let c=b[0].split(', ')
let d=b[1].split('\n')

function part1(){
	let ans=0;
	ans=d.filter(x=>{
		let v=arr(x.length+1,false);
		v[0]=true;
		for(let i=0;i<x.length;i++)if(v[i]){
			for(let j=0;j<c.length;j++)if(x.slice(i,i+c[j].length)==c[j]) v[i+c[j].length]=true;
		}
		return v[x.length];
	}).length
	console.log(ans);
}
part1();

function part2(){
	let ans=0;
	ans=d.map(x=>{
		let v=arr(x.length+1,0);
		v[0]=1;
		for(let i=0;i<x.length;i++)if(v[i]){
			for(let j=0;j<c.length;j++)if(x.slice(i,i+c[j].length)==c[j]) v[i+c[j].length]+=v[i];
		}
		return v[x.length];
	}).sum()
	console.log(ans);
}
part2();