Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

let exp2=`svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

function work(debug){
	let a=(debug?exp2:document.body.innerText).trimEnd();
	let b=a.split('\n').map(x=>x.split(': ')).map(x=>{return {st:x[0],ed:x[1].split(' ')}});
	let n=b.length;
	let all_label=b.map(x=>x.st).concat(['out']);
	b=b.map(x=>x.ed.map(y=>all_label.indexOf(y)));b.push([]);
	console.log(b);
	let indeg=arr(n+1);let is_sorted=arr(n+1);let sorted_arr=[];
	for(let i=0;i<n;i++) for(let j=0;j<b[i].length;j++){a=b[i][j];indeg[a]+=1;}
	function tryAdd(i){
		if(indeg[i]!=0||is_sorted[i]) return;
		is_sorted[i]=true;sorted_arr.push(i);
		for(let j=0;j<b[i].length;j++) {a=b[i][j];indeg[a]-=1;tryAdd(a);}
	}
	for(let i=0;i<=n;i++) tryAdd(i);
	console.log(sorted_arr);

	function part1(){
		let ans=0;
		let way=arr(n+1);
		way[all_label.indexOf('you')]=1;
		for(let i=0;i<=n;i++) for(let j=0;j<b[sorted_arr[i]].length;j++){a=b[sorted_arr[i]][j];way[a]+=way[sorted_arr[i]];}
		ans=way[all_label.indexOf('out')]
		console.log(ans);
	}
	part1();

	function part2(){
		let ans=1;

		let way=arr(n+1);
		way[all_label.indexOf('svr')]=1;
		for(let i=0;i<=n;i++) for(let j=0;j<b[sorted_arr[i]].length;j++){a=b[sorted_arr[i]][j];way[a]+=way[sorted_arr[i]];}
		ans*=way[all_label.indexOf('fft')];

		way=arr(n+1);
		way[all_label.indexOf('fft')]=1;
		for(let i=0;i<=n;i++) for(let j=0;j<b[sorted_arr[i]].length;j++){a=b[sorted_arr[i]][j];way[a]+=way[sorted_arr[i]];}
		ans*=way[all_label.indexOf('dac')];

		way=arr(n+1);
		way[all_label.indexOf('dac')]=1;
		for(let i=0;i<=n;i++) for(let j=0;j<b[sorted_arr[i]].length;j++){a=b[sorted_arr[i]][j];way[a]+=way[sorted_arr[i]];}
		ans*=way[all_label.indexOf('out')];

		console.log(ans);
	}
	part2();
}

debug=0;
work(debug);