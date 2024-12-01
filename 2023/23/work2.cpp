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

#include<map>
#include<vector>
struct edge{int to,len;edge(int to,int len):to(to),len(len){}};

const int N=40,M=70;
map<ll,int> mp[N];
int n,m;
vector<edge> e[N];

int dfs(int u,ll vis)
{
	if(u==n) return 0;
	if(mp[u].find(vis)!=mp[u].end()) return mp[u][vis];
	int ret=-1;
	for(auto i:e[u])
	{
		if(vis&(1ll<<i.to)) continue;
		int c=dfs(i.to,vis|(1ll<<i.to));
		if(c!=-1)  ret=max(ret,i.len+c);
	}
	return mp[u][vis]=ret;
}

int main()
{
	FILE *f=fopen("simple.txt","r");
	fscanf(f,"%d%d",&n,&m);
	F(i,1,m) {int u,v,w;fscanf(f,"%d%d%d",&u,&v,&w);e[u].push_back(edge(v,w));e[v].push_back(edge(u,w));}
	int ans=dfs(1,2);
	printf("%d\n",ans);
}
