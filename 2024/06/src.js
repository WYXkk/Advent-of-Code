let a = document.body.innerText.trim();
b=a.split('\n');
n=b.length;
c=b.map(x=>x.split(''))
let x0=0,y0=0;for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(b[i][j]=='^'){x0=i;y0=j;}
let d=0;let way=[[-1,0],[0,1],[1,0],[0,-1]];
let x=x0,y=y0;
while (true) {
    c[x][y]='X';
    let x_=x+way[d][0],y_=y+way[d][1];
    if(x_<0||x_>=n||y_<0||y_>=n) break;
    if(c[x_][y_]=='#') d=(d+1)%4;
    else {x=x_;y=y_;}
}
console.log(c.map(x=>x.filter(y=>y=='X').length).reduce((a,b)=>a+b,0));

let ans2=0;
for(let i=0;i<n;i++)for(let j=0;j<n;j++) if(b[i][j]!='#'&&b[i][j]!='^'){
	c=b.map(x=>x.split(''));c[i][j]='#';
	let x=x0,y=y0;let d=0;let step=0;
	while (true) {
	    let x_=x+way[d][0],y_=y+way[d][1];
	    if(x_<0||x_>=n||y_<0||y_>=n) break;
	    if(c[x_][y_]=='#') d=(d+1)%4;
	    else {x=x_;y=y_;}
	    step++;
	    if(step>4*n*n) {ans2++;break;}
	}
}
console.log(ans2);