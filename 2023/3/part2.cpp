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
int id[200][200],val[2000];
int n;
int dx[]={0, 0,0,1,-1,1,1,-1,-1},dy[]={0, 1,-1,0,0,-1,1,-1,1};

int main()
{
	scanf("%d",&n);
	FILE *f=fopen("input.txt","r");
	F(i,1,n) fscanf(f,"%s",s[i]+1);
	ll ans=0;
	int curID=0;
	F(i,1,n) F(j,1,n) if(isdigit(s[i][j]))
	{
		int k=j,num=0;
		while(k<=n&&isdigit(s[i][k])) {num=num*10+s[i][k]-'0';++k;}
		--k;
		
		++curID;
		F(t,j,k) id[i][t]=curID;val[curID]=num;
		
		j=k;
	}
	F(i,1,n) F(j,1,n) if(s[i][j]=='*')
	{
		int sur[4],cnt=0;
		F(t,1,8) if(id[i+dx[t]][j+dy[t]]!=0)
		{
			bool flag=false;
			int newID=id[i+dx[t]][j+dy[t]];
			F(i,1,cnt) if(sur[i]==newID) {flag=true;break;}
			if(flag) continue;
			++cnt;sur[cnt]=newID;
			if(cnt>=3) break;
		}
		if(cnt!=2) continue;
		ans+=val[sur[1]]*val[sur[2]];
	}
	printf("%lld",ans);
	return 0;
}
