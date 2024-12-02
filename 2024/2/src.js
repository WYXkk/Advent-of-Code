let a = document.body.innerText;
let b = a.split('\n').map(x => x.split(' '));
b.length -= 1;
safe = x => {
    x = x.map(y => parseInt(y));
    let n = x.length;
    for (let i = 0; i < n - 1; i++)
        if (Math.abs(x[i] - x[i + 1]) > 3) return false;
    for (let i = 0; i < n - 2; i++)
        if ((x[i] - x[i + 1]) * (x[i + 1] - x[i + 2]) <= 0) return false;
    return true;
}
console.log(b.filter(safe).length);
safe2 = x => safe(x) || x.map((_, ind) => safe(x.slice(0, ind).concat(x.slice(ind + 1)))).reduce((x, y) => x || y)
console.log(b.filter(safe2).length);
// beautified by https://beautifier.io/