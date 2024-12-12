Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n');
let n=b.length;

let vis=arr(n).map(x=>arr(n));
let ans=0;
for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(!vis[i][j]){
	let area=0,par=0;
	let que=[{x:i,y:j}];vis[i][j]=1;
	while(que.length){
		let t=que[0];que=que.slice(1);
		area+=1;
		for(let k=0;k<4;k++){
			let x_=t.x+dir4[k][0],y_=t.y+dir4[k][1];
			if(bound(x_,y_)&&b[t.x][t.y]==b[x_][y_]){
				if(!vis[x_][y_]){
					vis[x_][y_]=1;
					que.push({x:x_,y:y_})
				}
			}
			else par+=1;
		}
	}
	ans+=area*par;
}
console.log(ans)

vis=arr(n).map(x=>arr(n));
let ans2=0;
for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(!vis[i][j]){
	let area=0,par=0;
	let que=[{x:i,y:j}];vis[i][j]=1;
	let parRow=[];let parCol=[];
	while(que.length){
		let t=que[0];que=que.slice(1);
		area+=1;
		for(let k=0;k<4;k++){
			let x_=t.x+dir4[k][0],y_=t.y+dir4[k][1];
			if(bound(x_,y_)&&b[t.x][t.y]==b[x_][y_]){
				if(!vis[x_][y_]){
					vis[x_][y_]=1;
					que.push({x:x_,y:y_})
				}
			}
			else{
				if(k<2) parRow.push({x:t.x+k,y:t.y});
				else parCol.push({x:t.x,y:t.y+3-k});
			}
		}
	}
	parRow.sort((a,b)=>a.x!=b.x?a.x-b.x:a.y-b.y);
	parCol.sort((a,b)=>a.y!=b.y?a.y-b.y:a.x-b.x);
	//console.log(parRow);
	//console.log(parCol);
	par=2;
	for(let i=1;i<parRow.length;i++){
		par+=1;
		if(parRow[i].x==parRow[i-1].x&&parRow[i].y==parRow[i-1].y+1)
			if(parCol.filter(x=>x.x==parRow[i].x&&x.y==parRow[i].y).length==0)
				par-=1;
	}
	for(let i=1;i<parCol.length;i++){
		par+=1;
		if(parCol[i].x==parCol[i-1].x+1&&parCol[i].y==parCol[i-1].y)
			if(parRow.filter(x=>x.x==parCol[i].x&&x.y==parCol[i].y).length==0)
				par-=1;
	}
	ans2+=par*area;
}
console.log(ans2)