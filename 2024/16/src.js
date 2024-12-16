Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[0,1],[1,0],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n').map(x=>x.split(''));
let n=b.length;

let d=arr(n).map(x=>arr(n).map(y=>arr(4,1e9)));
let vis=arr(n).map(x=>arr(n).map(y=>arr(4,false)));
for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(b[i][j]=='S')d[i][j][1]=0;
while(true){
	let mn=1e9,mnp=[0,0,0];
	for(let i=0;i<n;i++)for(let j=0;j<n;j++)for(let k=0;k<4;k++){
		if(!vis[i][j][k])if(d[i][j][k]<mn){mn=d[i][j][k];mnp=[i,j,k];}
	}
	if(mn==1e9) break;
	let x=mnp[0],y=mnp[1],z=mnp[2];
	vis[x][y][z]=true;
	let nx=x+dir4[z][0],ny=y+dir4[z][1];
	if(bound(nx,ny)&&b[nx][ny]!='#') d[nx][ny][z]=Math.min(d[nx][ny][z],d[x][y][z]+1);
	d[x][y][(z+1)%4]=Math.min(d[x][y][(z+1)%4],d[x][y][z]+1000);
	d[x][y][(z+3)%4]=Math.min(d[x][y][(z+3)%4],d[x][y][z]+1000);
}

function part1(){
	let ans=0;
	for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(b[i][j]=='E'){
		ans=1e9;
		for(let k=0;k<4;k++) ans=Math.min(ans,d[i][j][k]);;
	}
	console.log(ans);
}
part1();

function part2(){
	let ans=0;
	let on=arr(n).map(x=>arr(n).map(y=>arr(4,false)));
	function back(a,b,c){
		if(on[a][b][c]) return;
		on[a][b][c]=true;
		let nx=a-dir4[c][0],ny=b-dir4[c][1];
		if(bound(nx,ny)) if(d[a][b][c]==d[nx][ny][c]+1) back(nx,ny,c);
		if(d[a][b][c]==d[a][b][(c+1)%4]+1000) back(a,b,(c+1)%4);
		if(d[a][b][c]==d[a][b][(c+3)%4]+1000) back(a,b,(c+3)%4);
	}
	for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(b[i][j]=='E'){
		ans=1e9;
		for(let k=0;k<4;k++) ans=Math.min(ans,d[i][j][k]);
		let a_=[];for(let k=0;k<4;k++) if(ans==d[i][j][k]) a_.push(k);
		for(let k=0;k<a_.length;k++) back(i,j,a_[k]);
		ans=on.map(x=>x.map(y=>y.reduce((a,b)=>a||b,false)?1:0).sum()).sum();
	}
	console.log(ans);
}
part2();