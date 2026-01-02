Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;

function work(debug){
	let a=(debug?exp:document.body.innerText).trimEnd();

	function part1(){
		let ans=0;
		cnt=[7,7,7,6,7,5];
		data=a.split('\n\n')[6].split('\n').map(x=>{a=x.split(': ');b=a[0].split('x').map(int);c=a[1].split(' ').map(int);return {size:b,req:c};})
		ans=data.map(x=>x.size[0]*x.size[1]-x.req.map((y,i)=>y*cnt[i]).sum()).filter(x=>x>=0).length;
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