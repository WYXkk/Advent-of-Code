Array.prototype.sum=function(){return this.reduce((a,b)=>a+b)}
let int=x=>parseInt(x);
let arr=(n,x=0)=>new Array(n).fill(x);
let dir4=[[-1,0],[1,0],[0,1],[0,-1]];
let dir8=[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,-1],[1,1],[-1,-1]];
let bound=(x,y)=>x>=0&&x<n&&y>=0&&y<n;

let exp=`##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`

let debug=0;
let a=(debug?exp:document.body.innerText).trim();
let b=a.split('\n\n');
let c=b[0].split('\n').map(x=>x.split(''));
let d=b[1].replaceAll('\n','');

let n=d.length;
let posX1=0,posY1=0;
for(let i=0;i<c.length;i++)for(let j=0;j<c[i].length;j++){
	if(c[i][j]=='@'){
		c[i][j]='.';
		posX1=i;posY1=j;
	}
}
for(let i=0;i<n;i++){
	let way='^v><'.indexOf(d[i]);
	let dx=dir4[way][0],dy=dir4[way][1];
	let nX=posX1+dx,nY=posY1+dy;
	while(c[nX][nY]=='O'){nX+=dx;nY+=dy;}
	if(c[nX][nY]!='#'){
		posX1+=dx;posY1+=dy;
		if(c[posX1][posY1]=='O'){
			c[posX1][posY1]='.';
			c[nX][nY]='O';
		}
	}
}
c.map((x,i)=>x.map((y,j)=>y=='O'?100*i+j:0).sum()).sum()

let c2=b[0].split('\n').map(x=>x.split('')).map(x=>x.map(y=>{
	if(y=='#') return '##';
	if(y=='O') return '[]';
	if(y=='@') return '@.';
	if(y=='.') return '..';
}).join('').split(''));
let posX2=0,posY2=0;
for(let i=0;i<c2.length;i++)for(let j=0;j<c2[i].length;j++){
	if(c2[i][j]=='@'){
		c2[i][j]='.';
		posX2=i;posY2=j;
	}
}
function movecheck(posX,posY,dx,dy){
	let c=c2[posX+dx][posY+dy];
	if(c=='.') return true;
	if(c=='#') return false;
	if(c=='['||c==']'){
		let leftX=posX+dx,leftY=posY+dy-(c==']');
		let rightX=posX+dx,rightY=posY+dy+(c=='[');
		if(dx==0) return movecheck(posX,posY+2*dy,dx,dy);
		else return movecheck(leftX,leftY,dx,dy)&&movecheck(rightX,rightY,dx,dy);
	}
}
function move(posX,posY,dx,dy){
	let c=c2[posX+dx][posY+dy];
	if(c=='['||c==']'){
		let leftX=posX+dx,leftY=posY+dy-(c==']');
		let rightX=posX+dx,rightY=posY+dy+(c=='[');
		if(dx==0){
			move(posX,posY+2*dy,dx,dy);
			move(posX,posY+dy,dx,dy);
		}
		else{
			move(leftX,leftY,dx,dy);
			move(rightX,rightY,dx,dy);
		}
	}
	c2[posX+dx][posY+dy]=c2[posX][posY];
	c2[posX][posY]='.';
}
for(let i=0;i<n;i++){
	let way='^v><'.indexOf(d[i]);
	let dx=dir4[way][0],dy=dir4[way][1];
	if(movecheck(posX2,posY2,dx,dy)){
		move(posX2,posY2,dx,dy);
		posX2+=dx;posY2+=dy;
	}
}
c2.map((x,i)=>x.map((y,j)=>y=='['?100*i+j:0).sum()).sum()