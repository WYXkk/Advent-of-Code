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

char s[200][200];
int n;
bool isc(int x,int y)
{
	if(x<1||x>n) return false;
	if(y<1||y>n) return false;
	char c=s[x][y];
	return !isdigit(c)&&c!='.';
}

int main()
{
	scanf("%d",&n);
	FILE *f=fopen("input.txt","r");
	F(i,1,n) fscanf(f,"%s",s[i]+1);
	int ans=0;
	F(i,1,n) F(j,1,n) if(isdigit(s[i][j]))
	{
		int k=j,num=0;
		while(k<=n&&isdigit(s[i][k])) {num=num*10+s[i][k]-'0';++k;}
		bool surr=false;
		F(p,i-1,i+1) F(q,j-1,k) surr=surr||isc(p,q);
		if(surr) ans+=num;
		j=k-1;
	}
	printf("%d",ans);
	return 0;
}
