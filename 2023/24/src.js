let a=document.body.innerText.split('\n');a.length--;
let b=a.map(x=>{
	let y=x.split(' @ ');
	return {pos:y[0].split(', ').map(t=>parseInt(t)),velo:y[1].split(', ').map(t=>parseInt(t))};
});

let n=b.length;let ans=0;
for(let i=0;i<n;i++) for(let j=i+1;j<n;j++){
	let x=b[i],y=b[j];
	if(x.velo[0]*y.velo[1]-x.velo[1]*y.velo[0]==0)continue;
	//x(t1)=y(t2)
	//x.pos[0]+t1*x.velo[0]=y.pos[0]+t2*y.velo[0]
	//x.pos[1]+t1*x.velo[1]=y.pos[1]+t2*y.velo[1]
	//(x.velo[1]*x.pos[0]-x.pos[1]*x.velo[0])=(x.velo[1]*y.pos[0]-y.pos[1]*x.velo[0])+t2*(x.velo[1]*y.velo[0]-y.velo[1]*x.velo[0])
	//t2=
	let t2=((x.velo[1]*x.pos[0]-x.pos[1]*x.velo[0])-(x.velo[1]*y.pos[0]-y.pos[1]*x.velo[0]))/(x.velo[1]*y.velo[0]-y.velo[1]*x.velo[0]);
	let t1=((y.velo[1]*y.pos[0]-y.pos[1]*y.velo[0])-(y.velo[1]*x.pos[0]-x.pos[1]*y.velo[0]))/(y.velo[1]*x.velo[0]-x.velo[1]*y.velo[0]);
	let d1=y.pos[0]+t2*y.velo[0],d2=y.pos[1]+t2*y.velo[1];
	if(d1>=200000000000000&&d1<=400000000000000
		&&d2>=200000000000000&&d2<=400000000000000
		&&t2>=0&&t1>=0) ++ans;
}
console.log(`Part 1: ${ans}`);

/*
277884961010842, 175505292281521, 178142491715369 @ 254, 319, -117
283566174834691, 323964410438583, 66367418575791 @ 127, -467, 561
292968982192924, 251621777313874, 229787798929295 @ 24, 26, 5

x y z a b c p q r

s.add(x+a*p=277884961010842+254*p)
s.add(y+b*p=175505292281521+319*p)
s.add(z+c*p=178142491715369-117*p)
s.add(x+a*q=283566174834691+127*q)
s.add(y+b*q=323964410438583-467*q)
s.add(z+c*q=66367418575791+561*q)
s.add(x+a*r=292968982192924+24*r)
s.add(y+b*r=251621777313874+26*r)
s.add(z+c*r=229787798929295+5*r)
*/