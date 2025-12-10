import z3

cases=[[[3,5,4,7],[[3],[1,3],[2],[2,3],[0,2],[0,1]]],[[7,5,12,7,2],[[0,2,3,4],[2,3],[0,4],[0,1,2],[1,2,3,4]]],[[10,11,11,5,10,5],[[0,1,2,3,4],[0,3,4],[0,1,2,4,5],[1,2]]]]
# this is the example

ans=0
for i in range(len(cases)):
	s=z3.Solver()
	def newInt(a,b,name):
		v=z3.Int(name)
		s.add(v>=a)
		s.add(v<=b)
		return v
	x=cases[i]
	data=[]
	var=[]
	mx=0
	su=0
	var_su=0
	for j in range(len(x[0])):
		data.append(0)
		mx=max(mx,x[0][j])
		su+=x[0][j]
	for j in range(len(x[1])):
		tmp=newInt(0,mx,f'v{j}')
		var.append(tmp)
		for k in range(len(x[1][j])):
			data[x[1][j][k]]=data[x[1][j][k]]+tmp
		var_su=var_su+tmp
	for j in range(len(x[0])):
		s.add(data[j]==x[0][j])
	while s.check()==z3.sat:
		su-=1
		s.add(var_su<=su)
	ans+=su+1

print(ans)