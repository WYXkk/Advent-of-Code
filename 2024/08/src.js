let a = document.body.innerText.trim();
let b=a.split('\n');
let n=b.length;
let res=new Array(n).fill(0).map(x=>new Array(n).fill(0));
for(let i1=0;i1<n;i1++)for(let j1=0;j1<n;j1++)for(let i2=0;i2<n;i2++)for(let j2=0;j2<n;j2++)
if(i1!=i2||j1!=j2)if(b[i1][j1]==b[i2][j2])if(b[i1][j1]!='.'){
    let i3=2*i1-i2,j3=2*j1-j2;
    if(i3>=0&&i3<n&&j3>=0&&j3<n) res[i3][j3]=1;
}
console.log(res.map(x=>x.reduce((a,b)=>a+b)).reduce((a,b)=>a+b))
for(let i1=0;i1<n;i1++)for(let j1=0;j1<n;j1++)for(let i2=0;i2<n;i2++)for(let j2=0;j2<n;j2++)
if(i1!=i2||j1!=j2)if(b[i1][j1]==b[i2][j2])if(b[i1][j1]!='.'){
    let di3=i1-i2,dj3=j1-j2,i3=i1,j3=j1;
    while(i3>=0&&i3<n&&j3>=0&&j3<n) {res[i3][j3]=1;i3+=di3;j3+=dj3;}
}
console.log(res.map(x=>x.reduce((a,b)=>a+b)).reduce((a,b)=>a+b))