Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;
unique=a=>a.filter((x,i)=>a.indexOf(x)==i);

let exp=`kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n').map(x=>x.split('-'));
let n=b.length;

let names=unique(b.reduce((u,v)=>u.concat(v),[]));
let m=names.length;
let mpn={};for(let i=0;i<m;i++) mpn[names[i]]=i;
let mp=arr(m).map(x=>arr(m));
for(let i=0;i<n;i++) mp[mpn[b[i][0]]][mpn[b[i][1]]]=mp[mpn[b[i][1]]][mpn[b[i][0]]]=1;

function part1(){
	let ans=0;
	for(let i=0;i<m;i++)for(let j=i+1;j<m;j++)for(let k=j+1;k<m;k++){
		if(mp[i][j]&&mp[j][k]&&mp[k][i]){
			if(names[i][0]=='t'||names[j][0]=='t'||names[k][0]=='t')
				++ans;
		}
	}
	console.log(ans);
}
part1();

let max=[];
function check(cur,add) {
	return cur.map(x=>mp[x][add]).reduce((a,b)=>a&b,1);
}
function dfs(cur,pos){
	if(cur.length>max.length) max=cur;
	if(pos==m) return;
	if(check(cur,pos)) dfs(cur.concat([pos]),pos+1);
	dfs(cur,pos+1);
}

function part2(){
	let ans=0;
	dfs([],0);
	console.log(max.map(x=>names[x]).sort().join(','));
}
part2();