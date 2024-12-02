let a=document.body.innerText.split('\n');a.length--;
chartoNum=(c)=>{
	if(c=='A')return 14;
	if(c=='K')return 13;
	if(c=='Q')return 12;
	if(c=='J')return 11;
	if(c=='T')return 10;
	return parseInt(c);
}
getRank=(str)=>{
	let sorted=str.split('').sort().join('');
	if(sorted[0]==sorted[4]) return 5;
	if(sorted[0]==sorted[3]||sorted[1]==sorted[4]) return 4;
	if((sorted[0]==sorted[2]&&sorted[3]==sorted[4])||(sorted[0]==sorted[1]&&sorted[2]==sorted[4])) return 3.5;
	if(sorted[0]==sorted[2]||sorted[1]==sorted[3]||sorted[2]==sorted[4]) return 3;
	let cnt=0;for(let i=0;i<=3;i++) if(sorted[i]==sorted[i+1]) cnt++;
	if(cnt==2) return 2.5;
	if(cnt==1) return 2;
	return 1;
}
compare=(a,b)=>{
	if(a==[]) return 0;
	if(a[0]!=b[0]) return a[0]<b[0]?-1:1;
	return compare(a.slice(1),b.slice(1));
}
let b=a.map(x=>x.split(' ')).map(x=>{return{str:x[0],num:parseInt(x[1])}});
b.sort((x,y)=>{
	if(getRank(x.str)!=getRank(y.str))
		return getRank(x.str)-getRank(y.str);
	let a=x.str.split('').map(chartoNum),b=y.str.split('').map(chartoNum);
	return compare(a,b);
});
let part1=b.map((val,ind)=>val.num*(ind+1)).reduce((a,b)=>a+b,0);
console.log(`Part 1: ${part1}`);

chartoNum2=(c)=>{
	if(c=='A')return 14;
	if(c=='K')return 13;
	if(c=='Q')return 12;
	if(c=='J')return 1;
	if(c=='T')return 10;
	return parseInt(c);
}
getRank2=(str)=>{
	let sorted=str.split('').map(chartoNum2).sort((a,b)=>a-b);
	let jokercount=0;for(let i in sorted)if(sorted[i]==1)++jokercount;
	let cnt=0,match=0;
	for(let i=jokercount;i<4;i++)
	{
		let a=(sorted[i]==sorted[i+1]);
		cnt+=a;
		if(a==(match+1)%2) match++;
	}
	if(match>=3) cnt-=0.5;
	cnt+=jokercount;
	if(jokercount==5) --cnt;
	return cnt+1;
}
b.sort((x,y)=>{
	if(getRank2(x.str)!=getRank2(y.str))
		return getRank2(x.str)-getRank2(y.str);
	let u=x.str.split('').map(chartoNum2),v=y.str.split('').map(chartoNum2);
	return compare(u,v);
});
let part2=b.map((val,ind)=>val.num*(ind+1)).reduce((a,b)=>a+b,0);
console.log(`Part 2: ${part2}`);