Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
a=a.replaceAll('R','').replaceAll('L','-');
let b=a.split('\n').map(x=>parseInt(x));
let n=b.length;

function part1(){
	let ans=0;
	let st=50;
	for(let i=0;i<n;i++){st+=b[i];st=((st%100)+100)%100;if(st==0)ans++;}
	console.log(ans);
}
part1();

function part2(){
	let ans=0;
	let st=50;
	for(let i=0;i<n;i++)
	{
		let dt=b[i]<0?-1:1;
		let times=b[i]*dt;
		for(let j=0;j<times;j++){
			st+=dt;
			st=((st%100)+100)%100;
			if(st==0)ans++;
		}
	}
	console.log(ans);
}
part2();