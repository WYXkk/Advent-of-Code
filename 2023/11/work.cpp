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

char s[150][150];
int spaceCol[150],spaceRow[150];
int sumCol[150],sumRow[150];
int galX[500],galY[500]; 

int n;int gal;

int main()
{
	FILE *f=fopen("input.txt","r");
	fscanf(f,"%d",&n);
	F(i,1,n) fscanf(f,"%s",s[i]+1);
	F(i,1,n) spaceRow[i]=spaceCol[i]=1;
	gal=0;
	F(i,1,n) F(j,1,n) if(s[i][j]=='#') {spaceRow[i]=spaceCol[j]=0;++gal;galX[gal]=i,galY[gal]=j;}
	sumCol[0]=0;sumRow[0]=0;
	F(i,1,n) sumCol[i]=sumCol[i-1]+spaceCol[i-1],sumRow[i]=sumRow[i-1]+spaceRow[i];
	int ansBase=0,ansExtra=0;
	F(i,1,gal) F(j,i+1,gal)
	{
		int dis=abs(galX[i]-galX[j])+abs(galY[i]-galY[j]);
		int extra=abs(sumRow[galX[i]]-sumRow[galX[j]])+abs(sumCol[galY[i]]-sumCol[galY[j]]);
		ansBase+=dis,ansExtra+=extra;
	}
	printf("Part 1: %d\nPart 2: %lld\n",ansBase+ansExtra,ansBase+999999ll*ansExtra);
}
