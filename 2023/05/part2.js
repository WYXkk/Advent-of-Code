let a=document.body.innerText.split('\n');a.push('');
let seed=a[0].split(' ').map(x=>parseInt(x));seed=seed.slice(1);
let cur=[];for(let i=0;i<seed.length/2;i++) cur.push({st:seed[2*i],ed:seed[2*i]+seed[2*i+1]-1});
let ind=1;
for(let step=1;step<=7;step++)
{
  let st=ind+2;let ed=st;
  while(a[ed]!='') ++ed;
  ind=ed;
  
  let arr=[];
  for(let j=st;j<ed;j++)
  {
    let x=a[j].split(' ').map(x=>parseInt(x));
    arr.push({desSt:x[0],srcSt:x[1],len:x[2]});
  }
  arr.sort((x,y)=>x.srcSt-y.srcSt);
  arr.push({desSt:10000000000,srcSt:10000000000,len:1});
  let lst=-1;let rem=[];
  for(let j in arr)
  {
    if(arr[j].srcSt!=lst+1)
    {
      rem.push({desSt:lst+1,srcSt:lst+1,len:arr[j].srcSt-lst-1});
    }
    lst=arr[j].srcSt+arr[j].len-1;
  }
  arr=arr.concat(rem);

  let newcur=[];
  for(let i in cur)
  {
    for(let j in arr)
    {
      let effmin=Math.max(cur[i].st,arr[j].srcSt);
      let effmax=Math.min(cur[i].ed,arr[j].srcSt+arr[j].len-1);
      if(effmax<effmin) continue;
      newcur.push({st:effmin+(arr[j].desSt-arr[j].srcSt),ed:effmax+(arr[j].desSt-arr[j].srcSt)});
    }
  }
  cur=[].concat(newcur);
}
console.log(cur.map(x=>x.st).reduce((a,b)=>Math.min(a,b),1000000000000000))