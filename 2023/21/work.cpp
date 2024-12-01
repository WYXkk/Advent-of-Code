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

int n,k,k2;
const int N=200;
char s[N][N];bool vis[2][N][N];

void part1()
{
	FILE *f=get();
	fscanf(f,"%d%d%d",&n,&k,&k2);
	F(i,1,n) fscanf(f,"%s",s[i]+1);
	F(i,1,n) F(j,1,n) if(s[i][j]=='S') vis[0][i][j]=true;
	F(t,1,k)
	{
		F(i,1,n) F(j,1,n) vis[1][i][j]=vis[0][i][j];
		F(i,1,n) F(j,1,n)
			vis[0][i][j]=(s[i][j]!='#')&&
				(vis[1][i-1][j]||vis[1][i][j-1]||vis[1][i+1][j]||vis[1][i][j+1]);
		//if(debug)
		//	{F(i,1,n) {F(j,1,n) {putchar(s[i][j]=='#'?'#':vis[0][i][j]?'O':'.');}putchar('\n');}putchar('\n');}
	}
	int ans=0;F(i,1,n) F(j,1,n) if(vis[0][i][j]) ++ans;
	printf("%d\n",ans);
	fclose(f);
}

int count(int stX,int stY,int step)
{
	F(i,1,n) F(j,1,n) vis[0][i][j]=false;
	vis[0][stX][stY]=true;
	F(t,1,step)
	{
		F(i,1,n) F(j,1,n) vis[1][i][j]=vis[0][i][j];
		F(i,1,n) F(j,1,n)
			vis[0][i][j]=(s[i][j]!='#')&&
				(vis[1][i-1][j]||vis[1][i][j-1]||vis[1][i+1][j]||vis[1][i][j+1]);
		//if(debug)
		//	{F(i,1,n) {F(j,1,n) {putchar(s[i][j]=='#'?'#':vis[0][i][j]?'O':'.');}putchar('\n');}putchar('\n');}
	}
	int ans=0;F(i,1,n) F(j,1,n) if(vis[0][i][j]) ++ans;
	printf("search complete: (%d,%d,%d) -> %d\n",stX,stY,step,ans);
	return ans;
}

void part2()
{
	int mid=(n+1)/2;
	ll tot=0;
	int all[2];all[0]=all[1]=0;
	
	F(i,1,n) F(j,1,n) vis[0][i][j]=false;
	vis[0][mid][mid]=true;
	F(t,1,2000)
	{
		F(i,1,n) F(j,1,n) vis[1][i][j]=vis[0][i][j];
		F(i,1,n) F(j,1,n)
			vis[0][i][j]=(s[i][j]!='#')&&
				(vis[1][i-1][j]||vis[1][i][j-1]||vis[1][i+1][j]||vis[1][i][j+1]||vis[1][i][j]);
		//if(debug)
		//	{F(i,1,n) {F(j,1,n) {putchar(s[i][j]=='#'?'#':vis[0][i][j]?'O':'.');}putchar('\n');}putchar('\n');}
	}
	
	F(i,1,n) F(j,1,n) if(vis[0][i][j]) all[(i+j)%2]++;
	//self
	tot+=all[k2%2];
	
	int cnt;
	//up
	cnt=(k2-mid)/n+1;
	while(true)
	{
		int remain=k2-mid-(cnt-1)*n;cnt--;
		int ans=count(n,mid,remain);
		tot+=ans;
		if(ans==all[(n+mid+remain)%2]&&cnt%2==0) break;
	}
	tot+=(cnt/2)*(all[0]+all[1]);
	//left
	cnt=(k2-mid)/n+1;
	while(true)
	{
		int remain=k2-mid-(cnt-1)*n;cnt--;
		int ans=count(mid,1,remain);
		tot+=ans;
		if(ans==all[(mid+1+remain)%2]&&cnt%2==0) break;
	}
	tot+=(cnt/2)*(all[0]+all[1]);
	//down
	cnt=(k2-mid)/n+1;
	while(true)
	{
		int remain=k2-mid-(cnt-1)*n;cnt--;
		int ans=count(1,mid,remain);
		tot+=ans;
		if(ans==all[(1+mid+remain)%2]&&cnt%2==0) break;
	}
	tot+=(cnt/2)*(all[0]+all[1]);
	//right
	cnt=(k2-mid)/n+1;
	while(true)
	{
		int remain=k2-mid-(cnt-1)*n;cnt--;
		int ans=count(mid,n,remain);
		tot+=ans;
		if(ans==all[(mid+n+remain)%2]&&cnt%2==0) break;
	}
	tot+=(cnt/2)*(all[0]+all[1]);
	
	//left up
	cnt=(k2-mid-mid)/n+1;
	while(true)
	{
		int remain=k2-mid-mid-(cnt-1)*n;
		int ans=count(n,n,remain);
		tot+=1ll*ans*cnt;cnt--;
		if(ans==all[(n+n+remain)%2]) break;
	}
	F(i,1,cnt) tot+=1ll*i*all[(n+n+(k2-mid-mid-(i-1)*n))%2];
	//left down
	cnt=(k2-mid-mid)/n+1;
	while(true)
	{
		int remain=k2-mid-mid-(cnt-1)*n;
		int ans=count(1,n,remain);
		tot+=1ll*ans*cnt;cnt--;
		if(ans==all[(1+n+remain)%2]) break;
	}
	F(i,1,cnt) tot+=1ll*i*all[(1+n+(k2-mid-mid-(i-1)*n))%2];
	//right up
	cnt=(k2-mid-mid)/n+1;
	while(true)
	{
		int remain=k2-mid-mid-(cnt-1)*n;
		int ans=count(n,1,remain);
		tot+=1ll*ans*cnt;cnt--;
		if(ans==all[(n+1+remain)%2]) break;
	}
	F(i,1,cnt) tot+=1ll*i*all[(n+1+(k2-mid-mid-(i-1)*n))%2];
	//right down
	cnt=(k2-mid-mid)/n+1;
	while(true)
	{
		int remain=k2-mid-mid-(cnt-1)*n;
		int ans=count(1,1,remain);
		tot+=1ll*ans*cnt;cnt--;
		if(ans==all[(1+1+remain)%2]) break;
	}
	F(i,1,cnt) tot+=1ll*i*all[(1+1+(k2-mid-mid-(i-1)*n))%2];
	printf("%lld\n",tot);
}

int main()
{
	//scanf("%d",&debug);
	debug=0;
	part1();
	part2();
}
