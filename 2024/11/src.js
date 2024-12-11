Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

/*
let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split(' ').map(int);
let blink=b=>b.map(x=>{
	if(x==0) return [1];
	if(x.toString().length%2==0){
		let s=x.toString();
		let n=s.length/2;
		return [int(s.slice(0,n)),int(s.slice(n))];
	}
	return [x*2024];
}).reduce((a,b)=>a.concat(b),[]);
let repeat=(f,n,x)=>n==0?x:f(repeat(f,n-1,x));
console.log(repeat(blink,25,b).length)
*/

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split(' ').map(int);
let saved=arr(76).map(x=>{return {};});
let dfs=(x,dep)=>{
	if(dep==0) return 1;
	if(saved[dep][x]!=undefined) return saved[dep][x];
	let ans=0;
	if(x==0) ans=dfs(1,dep-1);
	else{
		let s=x.toString();
		if(s.length%2==0){
			let n=s.length/2;
			ans=dfs(int(s.slice(0,n)),dep-1)+dfs(int(s.slice(n)),dep-1);
		}
		else ans=dfs(x*2024,dep-1);
	}
	return saved[dep][x]=ans;
}
console.log(b.map(x=>dfs(x,25)).sum());
console.log(b.map(x=>dfs(x,75)).sum());