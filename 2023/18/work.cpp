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

int vis[800][800];
int n;
#include<queue>
#define mp make_pair
typedef pair<int,int> pii;

void part1()
{
	FILE *f=get();
	fscanf(f,"%d",&n);
	char s[20];
	int x=336,y=80;
	F(i,1,n)
	{
		int c;
		fscanf(f,"%s%d%s",s,&c,s+5);
		switch(s[0])
		{
			case 'L':UF(j,y,y-c)vis[x][j]=2;y-=c;break;
			case 'R': F(j,y,y+c)vis[x][j]=2;y+=c;break;
			case 'U':UF(j,x,x-c)vis[j][y]=2;x-=c;break;
			case 'D': F(j,x,x+c)vis[j][y]=2;x+=c;break;
		}
	}
	queue<pii>q;
	q.push(mp(0,0));
	while(!q.empty())
	{
		auto x=q.front();q.pop();
		int a=x.first,b=x.second;
		if(vis[a][b]!=0) continue;
		vis[a][b]=1;
		if(a>0) q.push(mp(a-1,b));
		if(a<399) q.push(mp(a+1,b));
		if(b>0) q.push(mp(a,b-1));
		if(b<399) q.push(mp(a,b+1));
	}
	int ans=0;
	F(i,0,399) F(j,0,399) if(vis[i][j]!=1) ++ans;
	printf("P1: %d\n",ans);
	fclose(f);
}

int xPos[600],yPos[600];

int convert(char c){if(isdigit(c))return c-'0';else return c-'a'+10;}
void part2()
{
	FILE *f=get();
	fscanf(f,"%d",&n);
	ll x=0,y=0;
	ll suma=0,sumb=0;
	char s[20];
	F(i,1,n)
	{
		ll c;
		fscanf(f,"%s%d%s",s,&c,s+5);
		c=0;F(i,7,11) c=c*16+convert(s[i]);
		ll newX=x,newY=y;
		switch(s[12])
		{
			case '2':newY-=c;break;
			case '0':newY+=c;break;
			case '3':newX-=c;break;
			case '1':newX+=c;break;
		}
		if(debug)printf("%c %lld : (%lld,%lld) -> (%lld,%lld)\n",s[12],c,x,y,newX,newY);
		suma+=(x*newY-y*newX);sumb+=c;
		x=newX;y=newY;
	}
	ll ans=abs(suma/2)+(sumb/2)+1;
	printf("P2: %lld\n",ans);
	fclose(f);
}

int main()
{
	scanf("%d",&debug);
	part1();
	part2();
}
