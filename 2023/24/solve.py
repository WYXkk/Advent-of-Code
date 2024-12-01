import fileinput
data=[]
def transform(x):
    y=x.split(' @ ')
    y=list(map(lambda t:t.split(', '),y))
    y=list(map(lambda t:list(map(lambda t1:int(t1),t)),y))
    return y
for line in fileinput.input('input.txt'):
    data.append(transform(line))
print(len(data))

import z3
x,y,z=z3.Ints('x y z')
vx,vy,vz=z3.Ints('vx vy vz')

s=z3.Solver()
for i in range(5):
    ti=z3.Int("t_{x}".format(x=i))
    s.add(
        ti>=0,
        x+vx*ti==data[i][0][0]+data[i][1][0]*ti,
        y+vy*ti==data[i][0][1]+data[i][1][1]*ti,
        z+vz*ti==data[i][0][2]+data[i][1][2]*ti,
    )

s.check()
m=s.model()
sx,sy,sz,svx,svy,svz=m[x],m[y],m[z],m[vx],m[vy],m[vz]
print("pos=({},{},{}),v=({},{},{})".format(sx,sy,sz,svx,svy,svz))
