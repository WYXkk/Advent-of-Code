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

#include <chrono>
using namespace chrono;

int main()
{
	auto start = high_resolution_clock::now();
	int t=55826490,ans=0;ll d=246144110121111;
	for(int x=0;x<=t;x++) if(1ll*x*(t-x)>=d) ++ans;
	cout<<ans<<endl;
	auto stop = high_resolution_clock::now();
	duration<double> duration = stop - start;
	cout << "Execution time: " << duration.count() << " seconds." << endl;
}
