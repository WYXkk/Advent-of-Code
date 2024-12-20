Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n').map(x=>x.split(''));
let n=b.length;
let d=arr(n).map(x=>arr(n,1e8));
let sX=0,sY=0;for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(b[i][j]=='S'){sX=i;sY=j;b[i][j]='.'};
let road=[];
for(let D=0;true;D++){
	d[sX][sY]=D;
	road.push([sX,sY]);
	if(b[sX][sY]=='E') {b[sX][sY]='.';break;}
	for(let di=0;di<4;di++){
		let nX=sX+dir4[di][0],nY=sY+dir4[di][1];
		if((b[nX][nY]=='.'||b[nX][nY]=='E')&&d[nX][nY]==1e8){
			sX=nX;sY=nY;
			break;
		}
	}
}

function part1(){
	let ans=0;
	for(let i=0;i<road.length;i++) for(let j=i+1;j<road.length;j++){
		let D=Math.abs(road[i][0]-road[j][0])+Math.abs(road[i][1]-road[j][1]);
		if(D==2){
			let dd=j-i-D;
			if(dd>=100){
				ans++;
			}
		}
	}
	console.log(ans);
}
part1();

function part2(){
	let ans=0;
	for(let i=0;i<road.length;i++) for(let j=i+1;j<road.length;j++){
		let D=Math.abs(road[i][0]-road[j][0])+Math.abs(road[i][1]-road[j][1]);
		if(D<=20){
			let dd=j-i-D;
			if(dd>=100){
				ans++;
			}
		}
	}
	console.log(ans);
}
part2();