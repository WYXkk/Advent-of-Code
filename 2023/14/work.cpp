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

char s[200][200];
char t[200][200];

int n;

void part1()
{
	FILE *f=get();
	fscanf(f,"%d",&n);
	F(i,1,n) fscanf(f,"%s",s[i]+1);
	ll ans=0;
	F(j,1,n)
	{
		int lst=0;
		F(i,1,n)
		{
			if(s[i][j]=='O')
			{
				lst++;
				ans+=(n+1-lst);
			}
			if(s[i][j]=='#')
			{
				lst=i;
			}
		}
	}
	printf("%lld\n",ans);
}

void flip(int way)
{
	// way = 1,2,3,4 for up,left,down,right
	if(way==1)
	{
		F(j,1,n)
		{
			int lst=0;
			F(i,1,n)
			{
				if(t[i][j]=='O')
				{
					lst++;
					if(lst!=i) swap(t[lst][j],t[i][j]);
				}
				if(t[i][j]=='#')
				{
					lst=i;
				}
			}
		}
	}
	if(way==2)
	{
		F(i,1,n)
		{
			int lst=0;
			F(j,1,n)
			{
				if(t[i][j]=='O')
				{
					lst++;
					if(lst!=j) swap(t[i][lst],t[i][j]);
				}
				if(t[i][j]=='#')
				{
					lst=j;
				}
			}
		}
	}
	if(way==3)
	{
		F(j,1,n)
		{
			int lst=n+1;
			UF(i,n,1)
			{
				if(t[i][j]=='O')
				{
					lst--;
					if(lst!=i) swap(t[lst][j],t[i][j]);
				}
				if(t[i][j]=='#')
				{
					lst=i;
				}
			}
		}
	}
	if(way==4)
	{
		F(i,1,n)
		{
			int lst=n+1;
			UF(j,n,1)
			{
				if(t[i][j]=='O')
				{
					lst--;
					if(lst!=j) swap(t[i][lst],t[i][j]);
				}
				if(t[i][j]=='#')
				{
					lst=j;
				}
			}
		}
	}
}

ull hash_[10005];

void part2()
{
	// no need for input again
	// way = 1,2,3,4 for up,left,down,right
	FILE *f=fopen("out.txt","w");
	F(i,1,n) F(j,1,n) t[i][j]=s[i][j];
	int base=131;
	F(i,1,n) F(j,1,n) hash_[0]=hash_[0]*base+t[i][j];
	bool flag=false;int cycleA,cycleB;
	F(T,1,10000)
	{
		// way = 1,2,3,4 for up,left,down,right
		F(i,1,4) flip(i);
		if(debug)
		{
			fprintf(f,"After %d turn:\n",T);
			F(i,1,n) fprintf(f,"%s\n",t[i]+1);
		}
		F(i,1,n) F(j,1,n) hash_[T]=hash_[T]*base+t[i][j];
		if(debug)
		{
			fprintf(f,"hash value: %llu\n\n",hash_[T]);
		}
		F(x,0,T-1) if(hash_[x]==hash_[T])
		{
			printf("Cycle found: hash[%d]=hash[%d]\n",x,T);
			flag=true;cycleA=x;cycleB=T;break;
		}
		if(flag) break;
	}
	int num=(1000000000ll-cycleA)%(cycleB-cycleA)+cycleA;
	F(i,1,n) F(j,1,n) t[i][j]=s[i][j];
	F(T,1,num)
	{
		F(i,1,4) flip(i);
	}
	ll ans=0;
	F(i,1,n) F(j,1,n) if(t[i][j]=='O') ans+=(n+1-i);
	printf("%lld\n",ans);
}

int main()
{
	scanf("%d",&debug);
	part1();
	part2();
}
