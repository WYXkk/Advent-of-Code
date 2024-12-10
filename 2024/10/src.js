let sumReducer=(a,b)=>a+b;
let int=x=>parseInt(x);

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n').map(x=>x.split('').map(int));
let n=b.length;
let dir=[[-1,0],[1,0],[0,1],[0,-1]];
let ans=0;
for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(b[i][j]==0){
	let queue=[{x:i,y:j}];
	for(let k=1;k<=9;k++){
		let new_queue=[];
		for(let l in queue){
			for(let d in dir){
				let x_=queue[l].x+dir[d][0],y_=queue[l].y+dir[d][1];
				if(x_>=0&&x_<n&&y_>=0&&y_<n)if(b[x_][y_]==k){
					if(!new_queue.find(z=>z.x==x_&&z.y==y_)) new_queue.push({x:x_,y:y_});
				}
			}
		}
		queue=new_queue;
	}
	ans+=queue.length;
}
console.log(ans)
let way=new Array(n).fill(0).map(x=>new Array(n).fill(0));
for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(b[i][j]==0)way[i][j]=1;
for(let k=1;k<=9;k++)for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(b[i][j]==k){
	for(let d in dir){
		let x_=i+dir[d][0],y_=j+dir[d][1];
		if(x_>=0&&x_<n&&y_>=0&&y_<n)if(b[x_][y_]==k-1) way[i][j]+=way[x_][y_];
	}
}
ans2=0;
for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(b[i][j]==9)ans2+=way[i][j];
console.log(ans2)