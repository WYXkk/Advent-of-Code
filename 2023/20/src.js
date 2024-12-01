let a=document.body.innerText.split('\n');a.length--;

let b=a.map(x=>{
	let tmp=x.split(' -> ');
	let name=tmp[0];
	let list=tmp[1].split(', ');
	let type=0;
	if(name[0]=='%') type=1,name=name.slice(1);
	if(name[0]=='&') type=2,name=name.slice(1);
	return {type:type,name:name,toList:list};
})
const on=1,off=0;

const low=0,high=1;

let c={};for(let i in b) c[b[i].name]={type:b[i].type,name:b[i].name,toList:b[i].toList,fromLast:{},state:off};
for(let i in c){
	for(let j in c[i].toList){
		if(c[c[i].toList[j]]!=undefined)
		c[c[i].toList[j]].fromLast[i]=low;
	}
}

let cntLow=0,cntHigh=0;

for(let t=0;t<1000;t++){
	let que=[{node:'broadcaster',from:'button',type:low}];let cnt=0;
	while(cnt<que.length){
		let x=que[cnt];cnt++;
		//console.log(`${x.from} -${x.type?'high':'low'}-> ${x.node}`)
		if(x.type==low) ++cntLow;else ++cntHigh;
		let node=c[x.node];
		if(node==undefined) continue;
		if(node.type==0){
			for(let i in node.toList) que.push({node:node.toList[i],from:x.node,type:x.type});
		}
		if(node.type==1){
			if(x.type==low){
				node.state=1-node.state;
				for(let i in node.toList) que.push({node:node.toList[i],from:x.node,type:node.state});
			}
		}
		if(node.type==2){
			node.fromLast[x.from]=x.type;
			let sumstate=0;for(let i in node.fromLast) if(!node.fromLast[i]) {sumstate=1;break;}
			for(let i in node.toList) que.push({node:node.toList[i],from:x.node,type:sumstate});
		}
	}
}

console.log(`Part 1: ${cntLow}*${cntHigh}=${cntLow*cntHigh}`);


c={};for(let i in b) c[b[i].name]={type:b[i].type,name:b[i].name,toList:b[i].toList,fromLast:{},state:off};
for(let i in c){
	for(let j in c[i].toList){
		if(c[c[i].toList[j]]!=undefined)
		c[c[i].toList[j]].fromLast[i]=low;
	}
}

let p=['xj','km','qs','kz'];
let t=1;let flag=0;
for(;flag!=15;t++){
	let que=[{node:'broadcaster',from:'button',type:low}];let cnt=0;
	while(cnt<que.length){
		let x=que[cnt];cnt++;
		let node=c[x.node];
		if(x.node=='rx'&&x.type==low){flag=false;break;}
		if(node==undefined) continue;
		if(node.type==0){
			for(let i in node.toList) que.push({node:node.toList[i],from:x.node,type:x.type});
		}
		if(node.type==1){
			if(x.type==low){
				node.state=1-node.state;
				for(let i in node.toList) que.push({node:node.toList[i],from:x.node,type:node.state});
			}
		}
		if(node.type==2){
			node.fromLast[x.from]=x.type;
			let sumstate=0;for(let i in node.fromLast) if(!node.fromLast[i]) {sumstate=1;break;}
			for(let i in node.toList) que.push({node:node.toList[i],from:x.node,type:sumstate});
			if(p.indexOf(x.node)!=-1&&sumstate==1){console.log(`${x.node} send high at ${t}\n`);flag|=1<<(p.indexOf(x.node))}
		}
	}
}
