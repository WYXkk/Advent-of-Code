#include<cstdio>
#include<iostream>
#include<fstream>
#include<cmath>
#include<cstring>
#include<algorithm>
using namespace std;
#define F(i,a,b) for(int i=a,i##end=b;i<=i##end;++i)
#define UF(i,a,b) for(int i=a,i##end=b;i>=i##end;--i)
typedef long long ll;
typedef unsigned long long ull;

int debug=1;
FILE* get(){return debug?fopen("example.txt","r"):fopen("input.txt","r");}

int n;
char s[150][150];
const int N=150*150*4*10;const int M=N*4;
int dis[N];
int head[N],to[M],nxt[M],w[M],tot=0;
void add(int u,int v,int _w){++tot;to[tot]=v;w[tot]=_w;nxt[tot]=head[u];head[u]=tot;}

#include<queue>
typedef pair<int,int> pii;
priority_queue<pii,vector<pii>,greater<pii> >q;

int get(int i,int j,int way,int len){return (i*n+j)*12+(way*3)+len;}
int get2(int i,int j,int way,int len){return (i*n+j)*40+(way*10)+len;}
//way = 0,1,2,3 <-> up,left,down,right
#define mp make_pair
void part1()
{
	FILE *f=get();
	fscanf(f,"%d",&n);
	F(i,1,n) fscanf(f,"%s",s[i]+1);
	F(i,1,n) F(j,1,n)
	{
		if(i>1)
		{
			add(get(i,j,0,1),get(i-1,j,0,2),s[i-1][j]-'0');
			add(get(i,j,0,2),get(i-1,j,0,3),s[i-1][j]-'0');
			add(get(i,j,1,1),get(i-1,j,0,1),s[i-1][j]-'0');
			add(get(i,j,1,2),get(i-1,j,0,1),s[i-1][j]-'0');
			add(get(i,j,1,3),get(i-1,j,0,1),s[i-1][j]-'0');
			add(get(i,j,3,1),get(i-1,j,0,1),s[i-1][j]-'0');
			add(get(i,j,3,2),get(i-1,j,0,1),s[i-1][j]-'0');
			add(get(i,j,3,3),get(i-1,j,0,1),s[i-1][j]-'0');
		}
		if(i<n)
		{
			add(get(i,j,2,1),get(i+1,j,2,2),s[i+1][j]-'0');
			add(get(i,j,2,2),get(i+1,j,2,3),s[i+1][j]-'0');
			add(get(i,j,1,1),get(i+1,j,2,1),s[i+1][j]-'0');
			add(get(i,j,1,2),get(i+1,j,2,1),s[i+1][j]-'0');
			add(get(i,j,1,3),get(i+1,j,2,1),s[i+1][j]-'0');
			add(get(i,j,3,1),get(i+1,j,2,1),s[i+1][j]-'0');
			add(get(i,j,3,2),get(i+1,j,2,1),s[i+1][j]-'0');
			add(get(i,j,3,3),get(i+1,j,2,1),s[i+1][j]-'0');
		}
		if(j>1)
		{
			add(get(i,j,1,1),get(i,j-1,1,2),s[i][j-1]-'0');
			add(get(i,j,1,2),get(i,j-1,1,3),s[i][j-1]-'0');
			add(get(i,j,0,1),get(i,j-1,1,1),s[i][j-1]-'0');
			add(get(i,j,0,2),get(i,j-1,1,1),s[i][j-1]-'0');
			add(get(i,j,0,3),get(i,j-1,1,1),s[i][j-1]-'0');
			add(get(i,j,2,1),get(i,j-1,1,1),s[i][j-1]-'0');
			add(get(i,j,2,2),get(i,j-1,1,1),s[i][j-1]-'0');
			add(get(i,j,2,3),get(i,j-1,1,1),s[i][j-1]-'0');
		}
		if(j<n)
		{
			add(get(i,j,3,1),get(i,j+1,3,2),s[i][j+1]-'0');
			add(get(i,j,3,2),get(i,j+1,3,3),s[i][j+1]-'0');
			add(get(i,j,0,1),get(i,j+1,3,1),s[i][j+1]-'0');
			add(get(i,j,0,2),get(i,j+1,3,1),s[i][j+1]-'0');
			add(get(i,j,0,3),get(i,j+1,3,1),s[i][j+1]-'0');
			add(get(i,j,2,1),get(i,j+1,3,1),s[i][j+1]-'0');
			add(get(i,j,2,2),get(i,j+1,3,1),s[i][j+1]-'0');
			add(get(i,j,2,3),get(i,j+1,3,1),s[i][j+1]-'0');
		}
	}
	memset(dis,0x3f,sizeof dis);
	q.push(mp(0,get(1,1,0,1)));q.push(mp(0,get(1,1,3,1)));
	while(!q.empty())
	{
		auto x=q.top();q.pop();
		int a=x.second,b=x.first;
		if(dis[a]<=b) continue;
		dis[a]=b;
		for(int i=head[a];i;i=nxt[i]) q.push(mp(b+w[i],to[i]));
	}
	int ans=0x3f3f3f3f;
	F(i,1,12) ans=min(ans,dis[(n*n+n)*12+i]);
	printf("Part 1: %d\n",ans);
	fclose(f);
}

void part2()
{
	tot=0;memset(head,0,sizeof head);
	F(i,1,n) F(j,1,n)
	{
		if(i>1)
		{
			F(t,1,9) add(get2(i,j,0,t),get2(i-1,j,0,t+1),s[i-1][j]-'0');
			F(t,4,10) add(get2(i,j,1,t),get2(i-1,j,0,1),s[i-1][j]-'0');
			F(t,4,10) add(get2(i,j,3,t),get2(i-1,j,0,1),s[i-1][j]-'0');
		}
		if(i<n)
		{
			F(t,1,9) add(get2(i,j,2,t),get2(i+1,j,2,t+1),s[i+1][j]-'0');
			F(t,4,10) add(get2(i,j,1,t),get2(i+1,j,2,1),s[i+1][j]-'0');
			F(t,4,10) add(get2(i,j,3,t),get2(i+1,j,2,1),s[i+1][j]-'0');
		}
		if(j>1)
		{
			F(t,1,9) add(get2(i,j,1,t),get2(i,j-1,1,t+1),s[i][j-1]-'0');
			F(t,4,10) add(get2(i,j,0,t),get2(i,j-1,1,1),s[i][j-1]-'0');
			F(t,4,10) add(get2(i,j,2,t),get2(i,j-1,1,1),s[i][j-1]-'0');
		}
		if(j<n)
		{
			F(t,1,9) add(get2(i,j,3,t),get2(i,j+1,3,t+1),s[i][j+1]-'0');
			F(t,4,10) add(get2(i,j,0,t),get2(i,j+1,3,1),s[i][j+1]-'0');
			F(t,4,10) add(get2(i,j,2,t),get2(i,j+1,3,1),s[i][j+1]-'0');
		}
	}
	memset(dis,0x3f,sizeof dis);
	q.push(mp(0,get2(1,1,0,4)));q.push(mp(0,get2(1,1,3,4)));
	while(!q.empty())
	{
		auto x=q.top();q.pop();
		int a=x.second,b=x.first;
		if(dis[a]<=b) continue;
		dis[a]=b;
		for(int i=head[a];i;i=nxt[i]) q.push(mp(b+w[i],to[i]));
	}
	int ans=0x3f3f3f3f;
	F(i,1,40) ans=min(ans,dis[(n*n+n)*40+i]);
	printf("Part 2: %d\n",ans);
}

int main()
{
	scanf("%d",&debug);
	part1();
	part2();
}
