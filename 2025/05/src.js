Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

function work(debug){
	let a=(debug?exp:document.body.innerText).trim();
	let b=a.split('\n\n')[0].split('\n').map(x=>x.split('-').map(int));
	let c=a.split('\n\n')[1].split('\n').map(int);
	let n=b.length;let m=c.length;

	function part1(){
		let ans=0;
		for(let i=0;i<m;i++){
			let flag=0;
			for(let j=0;j<n;j++) if(b[j][0]<=c[i]&&c[i]<=b[j][1]) flag=1;
			ans+=flag;
		}
		console.log(ans);
	}
	part1();

	function part2(){
		let ans=0;
		b.sort((x,y)=>x[0]-y[0]);
		for(let i=0;i<n;i++){
			let st=b[i][0],ed=b[i][1];
			while(i<n-1&&b[i+1][0]<=ed+1){i++;ed=Math.max(ed,b[i][1]);}
			ans+=ed-st+1;
		}
		console.log(ans);
	}
	part2();
}

debug=0;
work(debug);