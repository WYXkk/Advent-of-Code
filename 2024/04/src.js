let a = document.body.innerText;
b=a.split('\n')
b.length-=1
b=b.map(x=>x.split(''))
let n=140
let direction=[[0,1],[1,0],[0,-1],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]]
let ans=0;
for(let i=0;i<n;i++)for(let j=0;j<n;j++)for(let d=0;d<8;d++)
	if(i+direction[d][0]*3>=0&&i+direction[d][0]*3<n&&j+direction[d][1]*3>=0&&j+direction[d][1]*3<n){
	    flg=true;
	    for(let k=0;k<4;k++)if(b[i+direction[d][0]*k][j+direction[d][1]*k]!='XMAS'[k])flg=false;
	    ans+=flg;
	}
console.log(ans);
let ans2=0;
for(let i=1;i<n-1;i++)for(let j=1;j<n-1;j++)if(b[i][j]=='A'){
	check=x=>x=='SM'||x=='MS';
	ans2+=check(b[i-1][j-1]+b[i+1][j+1])&&check(b[i-1][j+1]+b[i+1][j-1]);
}
console.log(ans2);