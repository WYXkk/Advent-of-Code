a=document.body.innerText;
b=a.split('\n').map(x=>x.split('   '));
c1=b.map(x=>parseInt(x[0]));c2=b.map(x=>parseInt(x[1]));
c1.sort();c2.sort();
c1.length=1000;c2.length=1000;
ans=0;for(let i in c1)ans+=Math.abs(c1[i]-c2[i]);console.log(ans);
ans=0;for(let i in c1)ans+=c1[i]*c2.filter(x=>x==c1[i]).length;console.log(ans);