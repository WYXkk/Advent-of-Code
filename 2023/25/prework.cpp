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

#include<string>
#include<map>
map<string,int> id;
int cnt=0;
vector<pair<int,int> > edge;
int getid(string s)
{
	if(id.find(s)!=id.end()) return id[s];
	else return id[s]=++cnt;
}

void part1()
{
	FILE *f=get();
	ifstream fin;
	fin.open(debug?"example.txt":"input.txt");
	string s;
	fin>>s;
	while(s.length()==4)
	{
		int x=getid(s.substr(0,3));
		fin>>s;while(s.length()==3){int y=getid(s);edge.push_back(make_pair(x,y));if(fin.eof()) s="";else fin>>s;}
	}
	FILE *fout=fopen("normal.txt","w");
	fprintf(fout,"%d %d\n",cnt,edge.size());
	for(auto i:edge) fprintf(fout,"%d %d\n",i.first,i.second);
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
