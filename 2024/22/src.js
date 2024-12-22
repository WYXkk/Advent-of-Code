Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`1
2
3
2024`;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n');
let n=b.length;

let iterate=x=>{
	x=(x^(x<<6))&16777215;
	x=(x^(x>>5))&16777215;
	x=(x^(x<<11))&16777215;
	return x;
}
let apply=(f,n,x)=>n==0?x:f(apply(f,n-1,x));

function part1(){
	let ans=b.map(int).map(x=>apply(iterate,2000,x)).sum();
	console.log(ans);
}
part1();

let itrArr=(f,n,x)=>n==0?[]:[x].concat(itrArr(f,n-1,f(x)));
let delta=(a)=>arr(a.length-1).map((x,i)=>a[i+1]-a[i]);

function part2(){
	let c=b.map(int).map(x=>itrArr(iterate,2001,x).map(y=>y%10));
	let d=c.map(delta);
	let final=arr(19).map(x=>arr(19).map(y=>arr(19).map(z=>arr(19))));
	for(let i=0;i<n;i++){
		let cur=arr(19).map(x=>arr(19).map(y=>arr(19).map(z=>arr(19))));
		for(let j=1996;j>=0;j--){
			cur[d[i][j]+9][d[i][j+1]+9][d[i][j+2]+9][d[i][j+3]+9]=c[i][j+4];
		}
		for(let A=0;A<19;A++)for(let B=0;B<19;B++)for(let C=0;C<19;C++)for(let D=0;D<19;D++)
			final[A][B][C][D]+=cur[A][B][C][D];
	}
	let ans=0;
	for(let A=0;A<19;A++)for(let B=0;B<19;B++)for(let C=0;C<19;C++)for(let D=0;D<19;D++)
		ans=Math.max(ans,final[A][B][C][D]);
	console.log(ans);
}
part2();