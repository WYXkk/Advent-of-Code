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
int dx[]={-1,0,1,0},dy[]={0,-1,0,1};
int len[150][150];
FILE*logg=fopen("log.txt","w");

int dfs(int x,int y,int last)
{
	if(len[x][y]!=0) return len[x][y];
	if(x==n) return 0;
	int ret=0;int way=-1;
	if(s[x][y]=='^') way=0;
	if(s[x][y]=='<') way=1;
	if(s[x][y]=='v') way=2;
	if(s[x][y]=='>') way=3;
	F(i,0,3) if(way==-1||way==i) if(i!=(last^2))
	{
		char c=s[x+dx[i]][y+dy[i]];
		if(c=='#') continue;
		if(c=="^<v>"[i^2]) continue;
		ret=max(ret,dfs(x+dx[i],y+dy[i],i));
	}
	if(0&&debug)fprintf(logg,"dfs(%d,%d,%c)->%d\n",x,y,"^<v>"[last],ret+1);
	return len[x][y]=ret+1;
}

void part1()
{
	FILE *f=get();
	fscanf(f,"%d",&n);
	F(i,1,n) fscanf(f,"%s",s[i]+1);
	int st=0;F(i,1,n) if(s[1][i]!='#') st=i;
	int ans=dfs(1,st,2);
	printf("Part 1: %d\n",ans);
	if(debug)
	{
		F(i,1,n)
		{
			F(j,1,n)
			{
				char c=0;
				if(s[i][j]=='#') c='#';
				else
				{
					int way=4;
					F(t,0,3) if(len[i+dx[t]][j+dy[t]]==len[i][j]-1) way=t;
					c="^<v>o"[way];
				}
				putchar(c);
			}
			printf("\n");
		}
	}
	fclose(f);
}

int node=0;int edge=0;
int u[2000],v[2000],w[2000];
bool vis[150][150];
int id[150][150];

void part2()
{
	F(i,1,n) if(s[1][i]!='#') s[0][i]='#';
	F(i,1,n) if(s[n][i]!='#') s[n+1][i]='#';
	F(i,1,n) F(j,1,n) if(s[i][j]!='#') if(!vis[i][j])
	{
		int deg=0;F(t,0,3) deg+=(s[i+dx[t]][j+dy[t]]!='#');
		if(deg!=2) {vis[i][j]=true;id[i][j]=++node;}
		else
		{
			vis[i][j]=true;
			int _u=-1,_v=-1,_w=0;
			F(t,0,3) if(s[i+dx[t]][j+dy[t]]!='#')
			{
				int x=i+dx[t],y=j+dy[t],last=t;
				while(true)
				{
					++_w;
					int deg2=0;F(t2,0,3) deg2+=(s[x+dx[t2]][y+dy[t2]]!='#');
					if(deg2!=2) break;
					vis[x][y]=true;
					F(t2,0,3) if(s[x+dx[t2]][y+dy[t2]]!='#') if(t2!=(last^2)) {x=x+dx[t2];y=y+dy[t2];last=t2;break;}
				}
				if(!vis[x][y]) {vis[x][y]=true;id[x][y]=++node;}
				if(_u!=-1) _v=id[x][y];else _u=id[x][y];
			}
			++edge;u[edge]=_u;v[edge]=_v;w[edge]=_w;
		}
	}
	FILE*f=fopen("simple.txt","w");
	fprintf(f,"%d %d\n",node,edge);
	F(i,1,edge) fprintf(f,"%d %d %d\n",u[i],v[i],w[i]);		
}

int main()
{
	scanf("%d",&debug);
	part1();
	part2();
}
