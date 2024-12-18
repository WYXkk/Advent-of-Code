Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n').map(x=>x.split(',').map(int));
let n=b.length;

let siz=debug?7:71;
let cor=debug?12:1024;
bound=(x,y)=>x>=0&&x<siz&&y>=0&&y<siz;

function part1(){
	let ans=0;
	let d=arr(siz).map(x=>arr(siz,1e6));
	let w=arr(siz).map(x=>arr(siz,true));
	for(let i=0;i<cor;i++) w[b[i][0]][b[i][1]]=false;
	d[0][0]=0;
	let q=[[0,0]];
	for(let i=0;i<q.length;i++){
		let x=q[i][0],y=q[i][1];
		for(let j=0;j<4;j++){
			let nx=x+dir4[j][0],ny=y+dir4[j][1];
			if(bound(nx,ny)&&w[nx][ny])if(d[x][y]+1<d[nx][ny]){
				q.push([nx,ny]);d[nx][ny]=d[x][y]+1;
			}
		}
	}
	ans=d[siz-1][siz-1];
	console.log(ans);
}
part1();

function check(cut){
	let v=arr(siz).map(x=>arr(siz,false));
	let w=arr(siz).map(x=>arr(siz,true));
	for(let i=0;i<cut;i++) w[b[i][0]][b[i][1]]=false;
	let q=[[0,0]];v[0][0]=true;
	for(let i=0;i<q.length;i++){
		let x=q[i][0],y=q[i][1];
		for(let j=0;j<4;j++){
			let nx=x+dir4[j][0],ny=y+dir4[j][1];
			if(bound(nx,ny)&&w[nx][ny])if(!v[nx][ny]){
				q.push([nx,ny]);
				v[nx][ny]=true;
			}
		}
	}
	return v[siz-1][siz-1];
}

function part2(){
	let ans=0;
	while(check(ans)) ans++;
	console.log(a.split('\n')[ans-1]);
}
part2();