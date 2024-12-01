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

int debug=1;

FILE* get(){return debug?fopen("example.txt","r"):fopen("input.txt","r");}

int n;
char s[200][200];

bool visa[200][200][4],visb[200][200];
int dx[]={-1,0,1,0},dy[]={0,-1,0,1};

// (from) up,left,down,right = 0,1,2,3

void dfs(int x,int y,int way)
{
	if(x<1||y<1||x>n||y>n) return;
	if(visa[x][y][way]) return;
	visa[x][y][way]=true;
	visb[x][y]=true;
#define go(w) dfs(x+dx[(w)^2],y+dy[(w)^2],w)
	if(s[x][y]=='.') go(way);
	if(s[x][y]=='/') go(3-way);
	if(s[x][y]=='\\') go(way^1);
	if(s[x][y]=='-')
	{
		go(1);go(3);
	}
	if(s[x][y]=='|')
	{
		go(0);go(2);
	}
#undef go
}

void part1()
{
	FILE *f=get();
	fscanf(f,"%d",&n);
	F(i,1,n) fscanf(f,"%s",s[i]+1);
	dfs(1,1,1);
	int ans=0;F(i,1,n)F(j,1,n)ans+=visb[i][j];
	printf("%d\n",ans);
	fclose(f);
}

void part2()
{
	int ans=0;
	F(i,1,n)
	{
		memset(visa,0,sizeof visa);memset(visb,0,sizeof visb);
		dfs(1,i,0);
		int cur=0;F(i,1,n)F(j,1,n)cur+=visb[i][j];ans=max(cur,ans);
	}
	F(i,1,n)
	{
		memset(visa,0,sizeof visa);memset(visb,0,sizeof visb);
		dfs(i,1,1);
		int cur=0;F(i,1,n)F(j,1,n)cur+=visb[i][j];ans=max(cur,ans);
	}
	F(i,1,n)
	{
		memset(visa,0,sizeof visa);memset(visb,0,sizeof visb);
		dfs(n,i,2);
		int cur=0;F(i,1,n)F(j,1,n)cur+=visb[i][j];ans=max(cur,ans);
	}
	F(i,1,n)
	{
		memset(visa,0,sizeof visa);memset(visb,0,sizeof visb);
		dfs(i,n,3);
		int cur=0;F(i,1,n)F(j,1,n)cur+=visb[i][j];ans=max(cur,ans);
	}
	printf("%d\n",ans);
}

int main()
{
	scanf("%d",&debug);
	part1();
	part2();
}
