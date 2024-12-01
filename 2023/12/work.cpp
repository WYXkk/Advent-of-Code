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

char s[500],t[100];
char ss[100];
int a[100],m;
int n;

int dfs(int pos,int checked,int cur)
{
	if(pos==n+1)
	{
		if(cur!=0&&cur!=a[checked+1]) return 0;
		checked+=(cur!=0);
		if(checked>=m) return 1;
		return 0;
	}
	int ret=0;
	if(s[pos]!='.') if(a[checked+1]>cur) ret+=dfs(pos+1,checked,cur+1);
	if(s[pos]!='#') if(cur==0||cur==a[checked+1]) ret+=dfs(pos+1,checked+(cur!=0),0);
	return ret;
}

ll dp[200][10][20];

int DEBUG=0;

FILE* get(){return DEBUG?fopen("example.txt","r"):fopen("input.txt","r");/*stdin*/}

void doit()
{
	F(chk,1,m+1) F(cur,0,a[chk]) dp[n+1][chk][cur]=0;
	F(pos,1,n+1) F(chk,1,m+1) dp[pos][chk][a[chk]+1]=0;
	dp[n+1][m+1][0]=1;
	UF(pos,n,1) F(chk,1,m+1) F(cur,0,a[chk])
	{
		dp[pos][chk][cur]=0;
		if(s[pos]!='#')
		{
			if(cur==0) dp[pos][chk][cur]+=dp[pos+1][chk][0];
			if(chk<=m&&cur==a[chk]) dp[pos][chk][cur]+=dp[pos+1][chk+1][0];
		}
		if(s[pos]!='.')
		{
			if(cur!=a[chk]) dp[pos][chk][cur]+=dp[pos+1][chk][cur+1];
		}
	}
}

int main()
{
	FILE *f=get();
	int T;fscanf(f,"%d",&T);
	ll ans=0;
	F(i,1,T)
	{
		fscanf(f,"%s",s+1);n=strlen(s+1);
		s[n+1]='.';n++;s[n+1]=0;
		if(DEBUG) cout<<s+1<<endl;
		fscanf(f,"%s",t+1);
		{
			int l=strlen(t+1);t[l+1]=',';
			char* piv=t+1;
			m=0;
			while(piv<=t+l){m++;sscanf(piv,"%d",&a[m]);while(*piv!=',') piv++;piv++;}
			a[m+1]=0;
			if(DEBUG) {F(x,1,m) cout<<a[x]<<' ';cout<<endl;}
		}
		doit();
		if(DEBUG) cout<<dp[1][1][0]<<endl;
		ans+=dp[1][1][0];
	}
	printf("%lld\n",ans);
	fclose(f);
	
	f=get();
	fscanf(f,"%d",&T);
	ans=0;
	F(i,1,T)
	{
		fscanf(f,"%s",ss+1);n=strlen(ss+1);
		sprintf(s+1,"%s?%s?%s?%s?%s.",ss+1,ss+1,ss+1,ss+1,ss+1);n=n*5+5;
		if(DEBUG) cout<<s+1<<endl;
		fscanf(f,"%s",t+1);
		{
			int l=strlen(t+1);t[l+1]=',';
			char* piv=t+1;
			m=0;
			while(piv<=t+l){m++;sscanf(piv,"%d",&a[m]);while(*piv!=',') piv++;piv++;}
			F(i,1,m) F(j,1,4) a[i+j*m]=a[i];m*=5;a[m+1]=0;
			if(DEBUG) {F(x,1,m) cout<<a[x]<<' ';cout<<endl;}
		}
		doit();
		if(DEBUG) cout<<dp[1][1][0]<<endl;
		ans+=dp[1][1][0];
	}
	printf("%lld\n",ans);
	fclose(f);
}
