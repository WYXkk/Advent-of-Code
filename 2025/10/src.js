Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

function work(debug){
	let a=(debug?exp:document.body.innerText).trimEnd();
	let b=a.split('\n');
	let n=b.length;
	b=b.map(x=>{
		let tmp=x.match(/\[(.*)] (.*) \{(.*)\}/).slice(1);
		return {states:tmp[0].split('').map(y=>y=='#'),op:tmp[1].replaceAll('(','').replaceAll(')','').split(' ').map(y=>y.split(',')),jol:tmp[2].split(',')};
	})

	function part1(){
		let ans=0;
		for(let i=0;i<n;i++){
			let x=b[i];
			let cur_ans=1e5;
			let m=x.op.length;
			for(let j=0;j<(1<<m);j++){
				let tmp=[].concat(x.states);let cnt=0;
				for(let i=0;i<m;i++) if((j>>i)&1) {cnt++;for(let k=0;k<x.op[i].length;k++) tmp[x.op[i][k]]^=1;}
				if(tmp.sum()==0) cur_ans=Math.min(cur_ans,cnt);
			}
			ans+=cur_ans;
		}
		console.log(ans);
	}
	part1();

	function part2(){
		console.log('cases=['+b.map(x=>'[['+x.jol.join(',')+'],['+x.op.map(y=>'['+y.join(',')+']').join(',')+']]').join(',')+']')
		// this outputs a string that pastes into src.py
		// because I don't know python input haha
	}
	part2();
}

debug=0;
work(debug);