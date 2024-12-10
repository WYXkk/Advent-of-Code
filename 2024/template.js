let sumReducer=(a,b)=>a+b;
let int=x=>parseInt(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n');
let n=b.length;