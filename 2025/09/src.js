Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

function work(debug){
	let a=(debug?exp:document.body.innerText).trimEnd();
	let b=a.split('\n').map(x=>x.split(',').map(int));
	let n=b.length;

	function part1(){
		let ans=0;
		function area(x1,y1,x2,y2){
			return (Math.abs(x1-x2)+1)*(Math.abs(y1-y2)+1);
		}
		for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) ans=Math.max(area(b[i][0],b[i][1],b[j][0],b[j][1]),ans);
		console.log(ans);
	}
	part1();

	function part2(){
		let ans=0;
		function area(x1,y1,x2,y2){
			return (Math.abs(x1-x2)+1)*(Math.abs(y1-y2)+1);
		}
		b.push(b[0]);
		function valid(i,j){
			let x1=Math.min(b[i][0],b[j][0]),x2=Math.max(b[i][0],b[j][0]);
			let y1=Math.min(b[i][1],b[j][1]),y2=Math.max(b[i][1],b[j][1]);
			for(let k=0;k<n;k++){
				if(x1<b[k][0]&&b[k][0]<x2&&y1<b[k][1]&&b[k][1]<y2) return false;
				if(b[k][0]==b[k+1][0]){
					let p=Math.min(b[k][1],b[k+1][1]),q=Math.max(b[k][1],b[k+1][1]);
					if(x1<b[k][0]&&b[k][0]<x2&&p<=y1&&y2<=q) return false;
				}
				if(b[k][1]==b[k+1][1]){
					let p=Math.min(b[k][0],b[k+1][0]),q=Math.max(b[k][0],b[k+1][0]);
					if(y1<b[k][1]&&b[k][1]<y2&&p<=x1&&x2<=q) return false;
				}
			}
			return true;
		}
		for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) if(valid(i,j)) ans=Math.max(area(b[i][0],b[i][1],b[j][0],b[j][1]),ans);
		console.log(ans);
	}
	part2();
	// not guaranteed correct. consider this example
	// #XX#
	// #X#X
	// ..XX
	// ..##
	// (1,1) - (3,3) is marked as valid but actually not
}

debug=0;
work(debug);