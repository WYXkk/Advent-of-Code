Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

function work(debug){
	let a=(debug?exp:document.body.innerText).trimEnd();
	let b=a.split('\n').map(x=>x.split(',').map(int));
	let n=b.length;
	let merges=debug?10:1000;

	function d(a,b){
		return Math.sqrt(a.map((x,i)=>(x-b[i])**2).sum());
	}

	function part1(){
		let ans=0;

		let fa=arr(n).map((x,i)=>i);
		function get(x){if(fa[x]!=x)fa[x]=get(fa[x]);return fa[x];}
		function merge(x,y){fa[get(x)]=get(y);}

		let list=[];
		for(let i=0;i<n;i++) for(let j=i+1;j<n;j++){
			list.push({d:d(b[i],b[j]),i:i,j:j});
		}
		list.sort((x,y)=>x.d-y.d);
		if(debug) console.log(list);
		for(let i=0;i<merges;i++) merge(list[i].i,list[i].j);
		let vis=arr(n);let size=[];
		for(let i=0;i<n;i++) if(!vis[i]){
			let f=get(i);let tmp=0;
			for(let j=0;j<n;j++) if(get(j)==f) {vis[j]=1;tmp+=1;}
			size.push(tmp);
		}
		size.sort((x,y)=>y-x);
		if(debug) console.log(size);
		ans=size[0]*size[1]*size[2];
		console.log(ans);
	}
	part1();

	function part2(){
		let ans=0;

		let fa=arr(n).map((x,i)=>i);
		function get(x){if(fa[x]!=x)fa[x]=get(fa[x]);return fa[x];}
		let lst=0;
		function merge(x,y){
			if(get(x)!=get(y)) lst=b[x][0]*b[y][0];
			fa[get(x)]=get(y);
		}

		let list=[];
		for(let i=0;i<n;i++) for(let j=i+1;j<n;j++){
			list.push({d:d(b[i],b[j]),i:i,j:j});
		}
		list.sort((x,y)=>x.d-y.d);
		for(let i=0;i<list.length;i++) merge(list[i].i,list[i].j);
		ans=lst;
		console.log(ans);
	}
	part2();
}

debug=0;
work(debug);