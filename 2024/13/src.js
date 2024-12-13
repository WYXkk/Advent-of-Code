Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n\n');
let n=b.length;

let Acost=3,Bcost=1;
let c=b.map(x=>{
	let y=x.match(/Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize\: X=(\d+), Y=(\d+)/);
	return {A:{x:int(y[1]),y:int(y[2])},B:{x:int(y[3]),y:int(y[4])},des:{x:int(y[5]),y:int(y[6])}};
})
console.log(c.map(x=>{
	let ans=1000;let flg=false;
	for(let i=0;i<=100;i++)for(let j=0;j<=100;j++)if(x.A.x*i+x.B.x*j==x.des.x&&x.A.y*i+x.B.y*j==x.des.y){
		ans=Math.min(ans,i*Acost+j*Bcost);
		flg=true;
	}
	if(flg) return ans;else return 0;
}).sum())

console.log(c.map(x=>{
	let desx=x.des.x+10000000000000,desy=x.des.y+10000000000000;
	let d=x.A.y*x.B.x-x.A.x*x.B.y;
	if((x.A.y*desx-x.A.x*desy)%d!=0) return 0;
	let b=(x.A.y*desx-x.A.x*desy)/d;
	if((x.B.x*desy-x.B.y*desx)%d!=0) return 0;
	let a=(x.B.x*desy-x.B.y*desx)/d;
	if(a<0||b<0) return 0;
	return a*Acost+b*Bcost;
}).sum())