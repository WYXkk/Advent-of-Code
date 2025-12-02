Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split(',').map(x=>x.split('-').map(int));
let n=b.length;

function invalid(n){
	let s=n.toString();
	if(s.length%2) return false;
	let m=s.length/2;
	let a=s.slice(0,m),b=s.slice(m);
	return a==b;
}

function invalid2(n){
	let s=n.toString();let m=s.length;
	for(let i=1;i<m;i++) if(m%i==0){
		let a=s.slice(0,i);let flag=true;
		for(let j=0;j<m/i;j++) if(s.slice(j*i,(j+1)*i)!=a) flag=false;
		if(flag) return true;
	}
	return false;
}

// this function is added after completion
function invalid2new(n){
	let s=n.toString();let m=s.length;
	for(let i=1;i<m;i++){
		if((s.slice(i)+s.slice(0,i))==s) return true;
	}
	return false;
}

function part1(){
	let ans=0;
	ans=b.map(x=>{
		tmp=0;
		for(let i=x[0];i<=x[1];i++){
			if(invalid(i)){
				tmp+=i;
				//console.log(i);
			}
		}
		return tmp;
	}).sum();
	console.log(ans);
}
part1();

function part2(){
	let ans=0;
	ans=b.map(x=>{
		tmp=0;
		for(let i=x[0];i<=x[1];i++){
			if(invalid2(i)){
				tmp+=i;
				//console.log(i);
			}
		}
		return tmp;
	}).sum();
	console.log(ans);
}
part2();