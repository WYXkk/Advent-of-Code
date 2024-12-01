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

FILE* get(){return debug?fopen("normal_exp.txt","r"):fopen("normal.txt","r");}

const int N=2000,M=4000,INF=1e9;
int n,m;
int fa[N];
struct edge{int u,v;}e[M];
int find(int u){return fa[u]==u?u:fa[u]=find(fa[u]);}
bool merge(int u,int v){u=find(u),v=find(v);fa[u]=v;return u!=v;}

void part1()
{
	FILE *f=get();
	fscanf(f,"%d%d",&n,&m);
	F(i,1,m) fscanf(f,"%d%d",&e[i].u,&e[i].v);
	while(true)
	{
		F(i,1,n) fa[i]=i;
		random_shuffle(e+1,e+m+1);
		int cnt=n;
		F(i,1,m)
		{
			int u=e[i].u,v=e[i].v;
			cnt-=merge(u,v);
			if(cnt==2) break;
		}
		int cut=0;
		F(i,1,m) if(find(e[i].u)!=find(e[i].v)) ++cut;
		if(cut==3)
		{
			int cnt1=1;
			F(i,2,n) if(find(i)==find(1)) ++cnt1;
			printf("Part 1: %d\n",cnt1*(n-cnt1));
			break;
		}
	}
	fclose(f);
}

void part2()
{
	
}

int main()
{
	scanf("%d",&debug);
	part1();
	part2();
}
