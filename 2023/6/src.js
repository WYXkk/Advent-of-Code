let t=[55,82,64,90],d=[246,1441,1012,1111]
let ans=1
for(let i=0;i<4;i++)
{
	let c=0
	for(let x=0;x<=t[i];x++) if(x*(t[i]-x)>=d[i]) ++c;
		ans*=c;
}
console.log(`Part 1: ${ans}`);

const start = Date.now();

t=55826490,d=246144110121111
ans=0
for(let x=0;x<=t;x++) if(x*(t-x)>=d) ++ans;
console.log(`Part 2: ${ans}`);

const end = Date.now();
console.log(`Execution time: ${end - start} ms`);