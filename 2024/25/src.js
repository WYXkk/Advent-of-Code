Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n\n');
let n=b.length;
let c=b.map(x=>{
	let ch=x[0];
	let ar=x.split('\n');
	let res=arr(ar[0].length).map((y,i)=>ar.filter(z=>z[i]==ch).length);
	if(ch=='.') res=res.map(x=>-x);
	return res;
})

function part1(){
	let ans=0;
	for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(c[i][0]*c[j][0]<0){
		let d=c[i].map((x,k)=>x+c[j][k]);
		if(d.map(x=>x<=0).reduce((a,b)=>a&&b,true)) ++ans;
	}
	console.log(ans/2);
}
part1();

function part2(){
	let ans=0;
	console.log(ans);
	// no part 2 today
}
part2();