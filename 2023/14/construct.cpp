#include<cstdio>
#include<iostream>
#include<fstream>
#include<cmath>
#include<cstring>
#include<algorithm>
using namespace std;
#define F(i,a,b) for(register int i=a,i##end=b;i<=i##end;++i)
#define UF(i,a,b) for(register int i=a,i##end=b;i>=i##end;--i)
typedef long long ll;
typedef unsigned long long ull;
template<typename T> inline T rd(T& x)
{
	T f=1;x=0;char c=getchar();
	for(;!isdigit(c);c=getchar()) if(c=='-') f=-1;
	for(; isdigit(c);c=getchar()) x=(x<<3)+(x<<1)+(T)(c-'0');
	x*=f;
	return x;
}
ll rd(){ll x;rd(x);return x;}

char s[200][200];
const int n=100;

void place(int x,int y,char c)
{
	if(x<1||y<1||x>n||y>n)
	{printf("Error: Try to place out of board (%d,%d)\n",x,y);exit(-1);}
	if(s[x][y]!='.'&&s[x][y]!=c)
	{printf("Error: Try to place at a placed place: (%d,%d)=%c\n",x,y,s[x][y]);exit(-1);}
	s[x][y]=c;
}

void placePattern(int x,int y,int cyc)
{
	place(x+1,y,'#');
	F(i,0,cyc-1)
	{
		if(i!=cyc-1) place(x+2+i,y+3+2*i,'#');
		place(x+3+i,y+2+2*i,'#');
		place(x+5+i,y+1+2*i,'#');
		place(x+4+i,y+1+2*i,'*');
		place(x+4+i,y+2+2*i,'*');
		if(i!=0) place(x+4+i,y+3+2*i,'*');
		place(x+3+i,y+3+2*i,'*');
	}
	place(x+4+(cyc-1),y+4+2*(cyc-1),'#');
	place(x,y+3+2*(cyc-1),'#');
	place(x+4,y+3,'O');
	F(i,x+1,x+cyc+1) place(i,y+3+2*(cyc-1),'*');
	F(i,y+1,y+2+2*(cyc-1)) place(x+1,i,'*');
	place(x+2,y+1,'*');place(x+3,y+1,'*');
}

int main()
{
	F(i,1,n) F(j,1,n) s[i][j]='.';
	
	int t;
	FILE *f=fopen("inp.txt","r");
	fscanf(f,"%d",&t);
	F(i,1,t)
	{
		int a,b,c;
		fscanf(f,"%d%d%d",&a,&b,&c);
		placePattern(a,b,c);
	}
	
	FILE *f1=fopen("out1.txt","w"),*f2=fopen("out2.txt","w");
	F(i,1,n)
	{
		F(j,1,n)
		{
			fprintf(f1,"%c",s[i][j]);
			if(s[i][j]=='*') s[i][j]='.';
			fprintf(f2,"%c",s[i][j]);
		}
		fprintf(f1,"\n");fprintf(f2,"\n");
	}
}
