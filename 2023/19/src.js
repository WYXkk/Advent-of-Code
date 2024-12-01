let a=document.body.innerText.split('\n\n');
let flow=a[0].split('\n');
let item=a[1].split('\n');item.length--;
item=item.map(x=>JSON.parse(x.replaceAll('=',':')
							 .replace('x','"x"').replace('m','"m"')
							 .replace('a','"a"').replace('s','"s"')));
let dict={};
for(let i in flow){
	let a=flow[i];
	let name=a.split('{')[0];a=a.split('{')[1].split('}')[0];
	dict[name]=[];
	let x=a.split(',');
	for(let z in x){
		if(x[z].indexOf(':')!=-1){
			let u=x[z].split(':');
			dict[name].push({cond:eval('w=>w.'+u[0]),src:u[0],dest:u[1]});
		}
		else{
			dict[name].push({cond:w=>true,src:'a>0',dest:x[z]});
		}
	}
}

let ans=0;
for(let i in item){
	let cur='in';
	while(cur!='R'&&cur!='A'){
		let z=dict[cur];
		for(let j in z) if(z[j].cond(item[i])) {cur=z[j].dest;break;}
	}
	if(cur=='A') ans+=item[i].x+item[i].m+item[i].a+item[i].s;
}
console.log('Part 1: '+ans);



function work(xMin,xMax,mMin,mMax,aMin,aMax,sMin,sMax,cur)
{
	//console.log(`Searching [${xMin},${xMax}]x[${mMin},${mMax}]x[${aMin},${aMax}]x[${sMin},${sMax}] in ${cur}`);
	if(xMin>xMax) return 0;
	if(mMin>mMax) return 0;
	if(aMin>aMax) return 0;
	if(sMin>sMax) return 0;
	if(cur=='A') return (xMax-xMin+1)*(mMax-mMin+1)*(aMax-aMin+1)*(sMax-sMin+1);
	if(cur=='R') return 0;
	let ret=0;
	let f=dict[cur];
	for(let i in f){
		let way=f[i].src[0];
		let cmp=f[i].src[1];
		let num=parseInt(f[i].src.slice(2));
		if(way=='x'){
			if(cmp=='>') {ret+=work(Math.max(xMin,num+1),xMax,mMin,mMax,aMin,aMax,sMin,sMax,f[i].dest);xMax=num;}
			else {ret+=work(xMin,Math.min(xMax,num-1),mMin,mMax,aMin,aMax,sMin,sMax,f[i].dest);xMin=num;}
		}
		if(way=='m'){
			if(cmp=='>') {ret+=work(xMin,xMax,Math.max(mMin,num+1),mMax,aMin,aMax,sMin,sMax,f[i].dest);mMax=num;}
			else {ret+=work(xMin,xMax,mMin,Math.min(mMax,num-1),aMin,aMax,sMin,sMax,f[i].dest);mMin=num;}
		}
		if(way=='a'){
			if(cmp=='>') {ret+=work(xMin,xMax,mMin,mMax,Math.max(aMin,num+1),aMax,sMin,sMax,f[i].dest);aMax=num;}
			else {ret+=work(xMin,xMax,mMin,mMax,aMin,Math.min(aMax,num-1),sMin,sMax,f[i].dest);aMin=num;}
		}
		if(way=='s'){
			if(cmp=='>') {ret+=work(xMin,xMax,mMin,mMax,aMin,aMax,Math.max(sMin,num+1),sMax,f[i].dest);sMax=num;}
			else {ret+=work(xMin,xMax,mMin,mMax,aMin,aMax,sMin,Math.min(sMax,num-1),f[i].dest);sMin=num;}
		}
	}
	return ret;
}

console.log('Part 2: '+work(1,4000,1,4000,1,4000,1,4000,'in'));