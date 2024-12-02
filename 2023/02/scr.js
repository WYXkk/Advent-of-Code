let a=document.body.innerText.split('\n');a.length--;

let amount={red:12,green:13,blue:14};
let p1=a
.map(t=>t.slice(t.indexOf(':')+2).split('; ').map(x=>x.split(', '))
	.map(x=>x.map(y=>y.split(' '))
		.map(y=>parseInt(y[0])<=amount[y[1]])
		.reduce((a,b)=>a&&b,true))
	.reduce((a,b)=>a&&b,true))
.map((ele,ind)=>ele?ind+1:0).reduce((a,b)=>a+b,0);
console.log(`Part 1: ${p1}`);

let p2=a
.map(t=>t.slice(t.indexOf(':')+2).split('; ').map(x=>x.split(', '))
	.map(x=>x.map(y=>y.split(' ')))
	.map(x=>{let w={red:0,blue:0,green:0};for(let y in x)w[x[y][1]]=Math.max(w[x[y][1]],parseInt(x[y][0]));return w;})
	.reduce((a,b)=>{return {red:Math.max(a.red,b.red),blue:Math.max(a.blue,b.blue),green:Math.max(a.green,b.green)};}))
.map(t=>t.red*t.blue*t.green)
.reduce((a,b)=>a+b,0);
console.log(`Part 2: ${p2}`);