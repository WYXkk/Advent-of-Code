Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=``;

function work(debug){
	let a=(debug?exp:document.body.innerText).trimEnd();
	let b=a.split('\n');
	let n=b.length;

	function part1(){
		let ans=0;
		console.log(ans);
	}
	part1();

	function part2(){
		let ans=0;
		console.log(ans);
	}
	part2();
}

debug=0;
work(debug);