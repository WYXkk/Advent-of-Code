let a = document.body.innerText;
console.log(a.match(/mul\([0-9]+,[0-9]+\)/g).map(x=>x.replace('mul(','').replace(')','').split(',').map(y=>parseInt(y)).reduce((a,b)=>a*b,1)).reduce((a,b)=>a+b,0));
b=a.match(/mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\)/g)
c=[];flg=true;for(let i in b){if(b[i][0]=='m'&&flg)c.push(b[i]);if(b[i]=='do()')flg=true;if(b[i]=='don\'t()')flg=false;}
console.log(c.map(x=>x.replace('mul(','').replace(')','').split(',').map(y=>parseInt(y)).reduce((a,b)=>a*b,1)).reduce((a,b)=>a+b,0))