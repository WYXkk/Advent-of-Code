import time

start = time.time()
ans=0;t=55826490;d=246144110121111;
for i in range(0,t+1):
    if i*(t-i)>=d:
        ans+=1
print(ans)
end = time.time()
print(end-start)
