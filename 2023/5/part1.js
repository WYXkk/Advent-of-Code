let a=document.body.innerText.split('\n');
let seed=a[0].split(' ').map(x=>parseInt(x));seed=seed.slice(1)
let cur=[].concat(seed)
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

  for(let i in cur)
  {
    for(let j in arr) if(arr[j].srcSt<=cur[i]&&cur[i]<arr[j].srcSt+arr[j].len)
    {cur[i]=arr[j].desSt+(cur[i]-arr[j].srcSt);break;}
  }
}
console.log(cur.reduce((a,b)=>Math.min(a,b),1000000000000000))