Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n\n');
let regs=b[0].split('\n').map(x=>int(x.slice(12)));
let prog=b[1].slice(9).split(',').map(int);

function exe(reg,lim=1e10){
	let ans=[];
	let pos=0;
	while(pos<prog.length-1){
		let op=prog[pos];let num=prog[pos+1];
		if(op==0||op==2||op==5||op==6||op==7){
			if(num==7) console.log('error: combo 7');
			if(num>3) num=reg[num-4];
		}
		if(op==0){
			reg[0]=Math.floor(reg[0]/Math.pow(2,num));
		}
		if(op==1){
			reg[1]=reg[1]^num;
		}
		if(op==2){
			reg[1]=num%8;
		}
		if(op==3){
			if(reg[0]!=0){
				pos=num-2;
			}
		}
		if(op==4){
			reg[1]=reg[1]^reg[2];
		}
		if(op==5){
			ans.push(num%8);
			if(ans.length>=lim) break;
		}
		if(op==6){
			reg[1]=Math.floor(reg[0]/Math.pow(2,num));
		}
		if(op==7){
			reg[2]=Math.floor(reg[0]/Math.pow(2,num));
		}
		pos+=2;
	}
	return ans;
}

function part1(){
	console.log(exe(regs).join(','));
}
part1();

function exe2(regA){
	if(regA[0]==0) return undefined;
	let lst=[0,0,0].concat(regA).slice(-4).map((x,i)=>x*(8**(3-i))).sum();
	return exe([lst,0,0],1)[0];
}

function part2(){
	let ans=[[]];
	for(let i=prog.length-1;i>=0;i--){
		let cur=[];
		for(let j=0;j<ans.length;j++) for(let k=0;k<8;k++){
			let tst=ans[j].concat(k);
			if(exe2(tst)==prog[i]) cur.push(tst);
		}
		// console.log(cur);
		ans=cur;
	}
	console.log(ans[0].join(''));
	// input this to a base converter (base 8 -> base 10) for the final result
}
part2();