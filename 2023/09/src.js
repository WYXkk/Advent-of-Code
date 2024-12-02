let a=document.body.innerText.split('\n');a.length--;

let b=a.map(x=>x.split(' ').map(t=>parseInt(t)));

delta=(x)=>{
	let ret=[];let len=x.length;
	for(let i=0;i<len-1;i++) ret.push(x[i+1]-x[i]);
	return ret;
}

isZero=(x)=>{
	return x.map(t=>t==0).reduce((a,b)=>a&&b,true);
}

let c=b.map(x=>{
	let l=x.length;
	let tmp=[[].concat(x)];
	let cur=[].concat(x);
	while(!isZero(cur)){
		let nxt=delta(cur);
		cur=[].concat(nxt);tmp.push([].concat(nxt));
	}
	let step=tmp.length;
	tmp[step-1].push(0);
	for(let t=step-2;t>=0;t--){
		tmp[t].push(tmp[t][l-t-1]+tmp[t+1][l-t-1]);
	}
	return tmp[0][l];
});

console.log(`Part 1: ${c.reduce((a,b)=>a+b,0)}`);

let d=b.map(x=>{
	x=x.reverse();
	let l=x.length;
	let tmp=[[].concat(x)];
	let cur=[].concat(x);
	while(!isZero(cur)){
		let nxt=delta(cur);
		cur=[].concat(nxt);tmp.push([].concat(nxt));
	}
	let step=tmp.length;
	tmp[step-1].push(0);
	for(let t=step-2;t>=0;t--){
		tmp[t].push(tmp[t][l-t-1]+tmp[t+1][l-t-1]);
	}
	return tmp[0][l];
});

console.log(`Part 2: ${d.reduce((a,b)=>a+b,0)}`);