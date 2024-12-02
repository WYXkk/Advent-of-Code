let a=document.body.innerText.split('\n');
a.length--;

let str='1234567890';
console.log(`Part 1: ${a.map(x=>parseInt((z=>z[0]+z[z.length-1])(x.split('').filter(y=>str.indexOf(y)!=-1)))).reduce((a,b)=>a+b)}`);

let temp=[
  {str:'0',num:0},
  {str:'1',num:1},
  {str:'2',num:2},
  {str:'3',num:3},
  {str:'4',num:4},
  {str:'5',num:5},
  {str:'6',num:6},
  {str:'7',num:7},
  {str:'8',num:8},
  {str:'9',num:9},
  {str:'one',num:1},
  {str:'two',num:2},
  {str:'three',num:3},
  {str:'four',num:4},
  {str:'five',num:5},
  {str:'six',num:6},
  {str:'seven',num:7},
  {str:'eight',num:8},
  {str:'nine',num:9}
];
let f=(x)=>{
	let firstNum=0,firstPos=1000000000,lastNum=0,lastPos=-1111;
	for(i in temp){
		if(x.indexOf(temp[i].str)!=-1&&x.indexOf(temp[i].str)<firstPos){
			firstPos=x.indexOf(temp[i].str);
			firstNum=temp[i].num;
		}
		if(x.lastIndexOf(temp[i].str)!=-1&&x.lastIndexOf(temp[i].str)>lastPos){
			lastPos=x.lastIndexOf(temp[i].str);
			lastNum=temp[i].num;
		}
	}
	return firstNum*10+lastNum;
};

console.log(`Part 2: ${a.map(f).reduce((a,b)=>a+b,0)}`);