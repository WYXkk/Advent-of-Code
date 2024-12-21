Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=``;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n');
let c=b.map(x=>int(x.slice(0,x.length-1)))
let n=b.length;

function layer(l){
	if(l==0) return {
		'7':[0,0],
		'8':[0,1],
		'9':[0,2],
		'4':[1,0],
		'5':[1,1],
		'6':[1,2],
		'1':[2,0],
		'2':[2,1],
		'3':[2,2],
		'-':[3,0],
		'0':[3,1],
		'A':[3,2],
	};
	else return {
		'-':[0,0],
		'^':[0,1],
		'A':[0,2],
		'<':[1,0],
		'v':[1,1],
		'>':[1,2],
	};
}

function dis(l,s,st='A'){
	if(l==3) return s.length;
	if(s.length==0) return 0;
	let ans=0;
	for(let i=0;i<s.length;i++){
		let cur=s[i];
		let x1=layer(l)[st][0],y1=layer(l)[st][1];
		let x2=layer(l)[cur][0],y2=layer(l)[cur][1];
		let xn=layer(l)['-'][0],yn=layer(l)['-'][1];
		let mn=1e8;
		let s1='^'.repeat(Math.max(x1-x2,0))+'v'.repeat(Math.max(x2-x1,0));
		let s2='<'.repeat(Math.max(y1-y2,0))+'>'.repeat(Math.max(y2-y1,0));
		if(x1!=xn||y2!=yn) mn=Math.min(mn,dis(l+1,s2+s1+'A'));
		if(x2!=xn||y1!=yn) mn=Math.min(mn,dis(l+1,s1+s2+'A'));
		ans+=mn;st=cur;
	}
	return ans;
}

function part1(){
	let ans=b.map(x=>dis(0,x)*int(x.slice(0,x.length-1))).sum();
	console.log(ans);
}
part1();

let cache=arr(27).map(x=>{return{};});

function dis2(l,s,st='A'){
	if(l==26) return s.length;
	if(cache[l][s]!=undefined) return cache[l][s];
	if(s.length==0) return 0;
	let ans=0;
	for(let i=0;i<s.length;i++){
		let cur=s[i];
		let x1=layer(l)[st][0],y1=layer(l)[st][1];
		let x2=layer(l)[cur][0],y2=layer(l)[cur][1];
		let xn=layer(l)['-'][0],yn=layer(l)['-'][1];
		let mn=1e200;
		let s1='^'.repeat(Math.max(x1-x2,0))+'v'.repeat(Math.max(x2-x1,0));
		let s2='<'.repeat(Math.max(y1-y2,0))+'>'.repeat(Math.max(y2-y1,0));
		if(x1!=xn||y2!=yn) mn=Math.min(mn,dis2(l+1,s2+s1+'A'));
		if(x2!=xn||y1!=yn) mn=Math.min(mn,dis2(l+1,s1+s2+'A'));
		ans+=mn;st=cur;
	}
	return cache[l][s]=ans;
}

function part2(){
	let ans=b.map(x=>dis2(0,x)*int(x.slice(0,x.length-1))).sum();
	console.log(ans);
}
part2();

// rk40 on part 1 and rk6 on part 2!!!
// first time on the global leaderboard this year