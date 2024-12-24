Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02`;

let unique=a=>a.filter((x,i)=>a.indexOf(x)==i);

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n\n');
let inp=b[0].split('\n').map(x=>x.split(': '));
let func=b[1].split('\n').map(x=>x.split(' '));
let names=inp.map(x=>x[0]).concat(func.map(x=>x[0])).concat(func.map(x=>x[2])).concat(func.map(x=>x[4]));
names=unique(names);
let cal={};
for(let i=0;i<names.length;i++)cal[names[i]]=[];
for(let i=0;i<func.length;i++){cal[func[i][0]].push(i);cal[func[i][2]].push(i);}
let exe_order=[];
let cur={};
function exec(id){
	let f=func[id];
	if(cur[f[0]]==undefined) return;
	if(cur[f[2]]==undefined) return;
	if(cur[f[4]]!=undefined) return;
	exe_order.push(id);
	let v=cur[f[0]]&&cur[f[2]];
	if(f[1]=='OR') v=cur[f[0]]||cur[f[2]];
	if(f[1]=='XOR') v=cur[f[0]]^cur[f[2]];
	setv(f[4],v);
}
function setv(name,val){
	cur[name]=val;
	let c=cal[name];
	for(let i=0;i<c.length;i++) exec(c[i]);
}
for(let i=0;i<inp.length;i++) setv(inp[i][0],inp[i][1]=='1');

function part1(){
	let ans=0;
	let s='';
	for(let i=0;true;i++){
		let v=cur[`z${(i+100).toString().slice(1)}`];
		if(v!=undefined) s=(v?'1':'0')+s;
		else break;
	}
	ans=parseInt(s,2);
	console.log(ans);
}
part1();

function part2(){
	console.log(exe_order.map(x=>b[1].split('\n')[x]).map((x,i)=>i%5==1?x+'\n':x).join('\n'))
	// Print the program and check by hand.
	// The implementation is standard full adder.
	// Swap only happen inside an adder.
}
part2();