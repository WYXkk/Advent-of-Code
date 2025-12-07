Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

function work(debug){
	let a=(debug?exp:document.body.innerText).trimEnd();
	let b=a.split('\n');
	let n=b.length;let m=b[0].length;

	function part1(){
		let ans=0;
		on=arr(m).map((x,i)=>b[0][i]=='S');
		for(let i=1;i<n;i++){
			let on2=arr(m);
			for(let j=0;j<m;j++) if(on[j]){
				if(b[i][j]=='.') on2[j]=1;
				if(b[i][j]=='^'){
					ans++;
					if(j!=0) on2[j-1]=1;
					if(j!=m-1) on2[j+1]=1;
				}
			}
			on=on2;
		}
		console.log(ans);
	}
	part1();

	function part2(){
		let ans=1;
		on=arr(m).map((x,i)=>b[0][i]=='S');
		for(let i=1;i<n;i++){
			let on2=arr(m);
			for(let j=0;j<m;j++){
				if(b[i][j]=='.') on2[j]+=on[j];
				if(b[i][j]=='^'){
					ans+=on[j];
					if(j!=0) on2[j-1]+=on[j];
					if(j!=m-1) on2[j+1]+=on[j];
				}
			}
			on=on2;
		}
		console.log(ans);
	}
	part2();
}

debug=0;
work(debug);