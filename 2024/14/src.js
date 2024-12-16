Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n').map(x=>x.replace('p','').replace('v','').replaceAll('=','').replace(' ',',').split(',').map(int));
let n=b.length;

let X=debug?11:101,Y=debug?7:103;
let mod=(a,b)=>((a%b)+b)%b;
let final=b.map(x=>{
	return {x:mod(x[0]+100*x[2],X),y:mod(x[1]+100*x[3],Y)}
})
let a1=final.filter(x=>x.x<(X-1)/2&&x.y<(Y-1)/2).length;
let a2=final.filter(x=>x.x<(X-1)/2&&x.y>(Y-1)/2).length;
let a3=final.filter(x=>x.x>(X-1)/2&&x.y<(Y-1)/2).length;
let a4=final.filter(x=>x.x>(X-1)/2&&x.y>(Y-1)/2).length;
console.log(a1*a2*a3*a4);

let output='';
for(let i=1;i<=11000;i++){
	let state=arr(Y).map(x=>arr(X));
	let final=b.map(x=>{
		return {x:mod(x[0]+i*x[2],X),y:mod(x[1]+i*x[3],Y)}
	})
	for(let j=0;j<b.length;j++){
		state[final[j].y][final[j].x]+=1;
	}
	let c=final.filter(x=>{
		let cnt=0;
		for(let i_=Math.max(0,x.x-1);i_<=Math.min(X-1,x.x+1);i_++)
			for(let j_=Math.max(0,x.y-1);j_<=Math.min(Y-1,x.y+1);j_++)
				cnt+=state[j_][i_];
		return cnt>=2;
	}).length;
	if(c>n*0.7){
		console.log(i);
	}
}