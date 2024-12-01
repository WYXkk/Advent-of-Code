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

int n;

char s[150][150];

int inloop[150][150];

int vis[150][150];

const int Left=1,Up=2,Right=4,Down=8;

int func(char c)
{
	if(c=='|') return 10;
	if(c=='-') return 5;
	if(c=='F') return 12;
	if(c=='L') return 6;
	if(c=='J') return 3;
	if(c=='7') return 9;
	if(c=='S') return 6;//hard code
	return -1;
}

FILE *fo=fopen("out.txt","w");

void dfs(int i,int j)
{
	if(i<=0||i>=n||j<=0||j>=n) return;
	if(vis[i][j]==0) {fprintf(fo,"dfs (ret) %d %d\n",i,j);return;}
	fprintf(fo,"dfs %d %d\n",i,j);
	vis[i][j]=0;
	if(!(inloop[i][j]&&((func(s[i][j])&Right)!=0))) dfs(i-1,j); 
	if(!(inloop[i][j]&&((func(s[i][j])&Down)!=0))) dfs(i,j-1);
	if(!(inloop[i+1][j+1]&&((func(s[i+1][j+1])&Left)!=0))) dfs(i+1,j); 
	if(!(inloop[i+1][j+1]&&((func(s[i+1][j+1])&Up)!=0))) dfs(i,j+1);
}

int main()
{
	FILE *fi=fopen("input.txt","r");
	fscanf(fi,"%d",&n);
	F(i,1,n) fscanf(fi,"%s",s[i]+1);
	
	int posX=0,posY=0;
	F(i,1,n) F(j,1,n) if(s[i][j]=='S') posX=i,posY=j;
	
	int step=0;int way=Right;
	while(true)
	{
		if(way==Left) posY--;
		if(way==Right)posY++;
		if(way==Up)   posX--;
		if(way==Down) posX++;
		
		++step;
		
		inloop[posX][posY]=1;
		
		if(way<=2) way<<=2;else way>>=2;
		way=func(s[posX][posY])^way;
		
		if(s[posX][posY]=='S') break;
	}
	printf("Part 1: %d\n",step/2);
	
	// half lattice
	
	F(i,1,n-1) F(j,1,n-1) vis[i][j]=1;
	dfs(1,1);
	int area=0;F(i,1,n-1) F(j,1,n-1) area+=vis[i][j];
	int lattice=area+1-step/2;
	printf("Part 2: %d\n",lattice);
	
	F(i,1,n) F(j,1,n) fprintf(fo,"%d%c",inloop[i][j]," \n"[j==n]);
	fprintf(fo,"\n");
	F(i,1,n-1) F(j,1,n-1) fprintf(fo,"%d%c",vis[i][j]," \n"[j==n-1]);
}
