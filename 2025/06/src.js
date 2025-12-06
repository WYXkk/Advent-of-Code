Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

function work(debug){
	let a=(debug?exp:document.body.innerText);a=a.slice(0,a.length-1);
	let b=a.split('\n');
	let n=b.length;

	function part1(){
		let ans=0;

		function deleteEmpty(arr){return arr.filter(x=>x!='');}

		let c=b.slice(0,n-1).map(x=>deleteEmpty(x.split(' ')).map(int));
		let d=deleteEmpty(b[n-1].split(' '));

		for(let i=0;i<d.length;i++){
			let tmp=arr(n-1).map((x,j)=>c[j][i]);
			if(d[i]=='+') ans+=tmp.sum();
			else ans+=tmp.reduce((a,b)=>a*b);
		}
		console.log(ans);
	}
	part1();

	function part2(){
		let ans=0;
		let m=b[0].length;
		let cur=[];
		for(let i=m-1;i>=0;i--){
			let str=arr(n).map((x,j)=>b[j][i]).join('').replaceAll(' ','');
			if(str=='') continue;
			cur.push(int(str));
			if(str[str.length-1]=='+'){
				ans+=cur.sum();
				cur=[];
			}
			if(str[str.length-1]=='*'){
				ans+=cur.reduce((a,b)=>a*b);
				cur=[];
			}
		}
		console.log(ans);
	}
	part2();
}

debug=0;
work(debug);