Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`987654321111111
811111111111119
234234234234278
818181911112111`;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n');
let n=b.length;

function part1(){
	let ans=0;
	for(let i=0;i<n;i++){
		let m=b[i].length;
		let tmp=0;
		for(let p=0;p<m;p++) for(let q=p+1;q<m;q++) tmp=Math.max(tmp,int(b[i][p]+b[i][q]));
			ans+=tmp;
	}
	console.log(ans);
}
part1();

function part2(){
	let ans=0;
	for(let i=0;i<n;i++){
		let m=b[i].length;
		let dp=arr(m+1).map(x=>arr(13,0));
		dp[0][1]=int(b[i][0]);
		for(let j=1;j<m;j++) for(let k=1;k<=12;k++) dp[j][k]=Math.max(dp[j-1][k],dp[j-1][k-1]*10+int(b[i][j]));
		ans+=dp[m-1][12];
	}
	console.log(ans);
}
part2();