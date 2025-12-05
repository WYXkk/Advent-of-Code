Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n');
let n=b.length;

function canLift(x,y){
	if(b[x][y]=='.') return 0;
	let adj=0;
	for(let i=0;i<8;i++){
		let nx=x+dir8[i][0],ny=y+dir8[i][1];
		if(bound(nx,ny)) adj+=(b[nx][ny]=='@');
	}
	return adj<4;
}

function part1(){
	let ans=0;
	for(let i=0;i<n;i++) for(let j=0;j<n;j++) ans+=canLift(i,j);
	console.log(ans);
}
part1();

let ans2=0;

function tryRemove(x,y){
	if(b[x][y]=='.') return;
	let adj=0;
	for(let i=0;i<8;i++){
		let nx=x+dir8[i][0],ny=y+dir8[i][1];
		if(bound(nx,ny)) adj+=(b[nx][ny]=='@');
	}
	if(adj<4){
		ans2+=1;b[x]=b[x].slice(0,y)+'.'+b[x].slice(y+1);
		for(let i=0;i<8;i++){
			let nx=x+dir8[i][0],ny=y+dir8[i][1];
			if(bound(nx,ny)) tryRemove(nx,ny);
		}
	}
}

function part2(){
	for(let i=0;i<n;i++) for(let j=0;j<n;j++) tryRemove(i,j);
	console.log(ans2);
}
part2();