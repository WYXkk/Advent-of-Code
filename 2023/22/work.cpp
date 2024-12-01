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
struct block{
	int x1,x2,y1,y2,z1,z2;
	void fall(int c){z1-=c;z2-=c;}
};
bool operator<(block a,block b){return a.z1<b.z1;}
block x[1500];
int area[12][12][410];
bool isAns[1500];

void part1()
{
	FILE *f=get();
	fscanf(f,"%d",&n);
	F(i,1,n) fscanf(f,"%d,%d,%d~%d,%d,%d",&x[i].x1,&x[i].y1,&x[i].z1,&x[i].x2,&x[i].y2,&x[i].z2);
	sort(x+1,x+n+1);
	F(i,1,n) isAns[i]=true;
	F(i,1,n)
	{
		bool flag=true;
		while(flag)
		{
			F(p,x[i].x1,x[i].x2) F(q,x[i].y1,x[i].y2) if(area[p][q][x[i].z1-1]!=0) flag=false;
			if(x[i].z1==1) flag=false;
			if(flag) x[i].fall(1);
		}
		F(p,x[i].x1,x[i].x2) F(q,x[i].y1,x[i].y2) F(r,x[i].z1,x[i].z2) area[p][q][r]=i;
		
		int nxt=0;
		F(p,x[i].x1,x[i].x2) F(q,x[i].y1,x[i].y2) if(area[p][q][x[i].z1-1]!=0)
		{
			if(nxt==-1) break;
			else if(nxt==0) nxt=area[p][q][x[i].z1-1];
			else if(nxt!=area[p][q][x[i].z1-1]) nxt=-1;
		}
		if(nxt!=0&&nxt!=-1) isAns[nxt]=false;
	}
	int ans=0;
	F(i,1,n) ans+=isAns[i];
	printf("Part 1: %d\n",ans);	
	fclose(f);
}

bool fallen[1500];
void part2()
{
	int ans=0;
	F(i,1,n) // suppose i fall
	{
		F(j,1,n) fallen[j]=false;fallen[i]=true;
		F(j,i+1,n)
		{
			bool flag=true;
			F(p,x[j].x1,x[j].x2) F(q,x[j].y1,x[j].y2) if(area[p][q][x[j].z1-1]!=0)
			{
				if(!fallen[area[p][q][x[j].z1-1]]) flag=false;
			}
			if(x[j].z1==1) flag=false;
			fallen[j]=flag;if(flag)++ans;
		}
	}
	printf("Part 2: %d\n",ans);
}

int main()
{
	scanf("%d",&debug);
	part1();
	part2();
}
