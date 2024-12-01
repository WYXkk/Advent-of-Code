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

char s[30][30];
char ss[30];

int DEBUG=0;

FILE* get(){return DEBUG?fopen("example.txt","r"):fopen("input.txt","r");}

void part1()
{
	FILE *f=get();
	int ans=0;
	while(fscanf(f,"%s",ss+1)!=EOF)
	{
		int m=strlen(ss+1);int n=1;
		memset(s,0,sizeof s);
		F(i,1,m) s[1][i]=ss[i];
		while(true)
		{
			char c;fscanf(f,"%c",&c);fscanf(f,"%c",&c);
			if(c=='\n') break;
			ss[1]=c;fscanf(f,"%s",ss+2);
			++n;F(i,1,m) s[n][i]=ss[i];
			if(DEBUG) cout<<"Trying read line "<<n<<": "<<s[n]+1<<endl;
		}
		if(DEBUG){F(i,1,n) cout<<s[i]+1<<endl;cout<<endl;}
		F(i,1,n-1)
		{
			bool flag=true;
			F(k,max(1,2*i+1-n),i)
			{
				F(j,1,m) if(s[k][j]!=s[2*i+1-k][j]) {flag=false;break;}
				if(!flag) break;
			}
			if(flag) ans+=i*100;
		}
		F(j,1,m-1)
		{
			bool flag=true;
			F(k,max(1,2*j+1-m),j)
			{
				F(i,1,n) if(s[i][k]!=s[i][2*j+1-k]) {flag=false;break;}
				if(!flag) break;
			}
			if(flag) ans+=j;
		}
	}
	cout<<ans<<endl;
}

void part2()
{
	FILE *f=get();
	int ans=0;
	while(fscanf(f,"%s",ss+1)!=EOF)
	{
		int m=strlen(ss+1);int n=1;
		memset(s,0,sizeof s);
		F(i,1,m) s[1][i]=ss[i];
		while(true)
		{
			char c;fscanf(f,"%c",&c);fscanf(f,"%c",&c);
			if(c=='\n') break;
			ss[1]=c;fscanf(f,"%s",ss+2);
			++n;F(i,1,m) s[n][i]=ss[i];
			if(DEBUG) cout<<"Trying read line "<<n<<": "<<s[n]+1<<endl;
		}
		if(DEBUG){F(i,1,n) cout<<s[i]+1<<endl;cout<<endl;}
		F(i,1,n-1)
		{
			int err=0;
			F(k,max(1,2*i+1-n),i)
			{
				F(j,1,m) if(s[k][j]!=s[2*i+1-k][j]) err++;
			}
			if(err==1) ans+=i*100;
		}
		F(j,1,m-1)
		{
			int err=0;
			F(k,max(1,2*j+1-m),j)
			{
				F(i,1,n) if(s[i][k]!=s[i][2*j+1-k]) err++;
			}
			if(err==1) ans+=j;
		}
	}
	cout<<ans<<endl;
}

int main()
{
	part1();
	part2();
}
