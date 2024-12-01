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

void part1()
{
	FILE *f=get();
	
	fclose(f);
}

void part2()
{
	FILE *f=get();
	
	fclose(f);
}

int main()
{
	scanf("%d",&debug);
	part1();
	part2();
}
