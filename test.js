var num = [1, 2, 3, 2, -1]
var compare = 0;

function max(a) {
    for (var i = 0; i <= a.length - 1; i++) {
        if (i === 0) {
            compare = a[i];
        } else {
            if (a[i] >= compare) {
                compare = a[i];
            }
        }
    }
}
max(num);
console.log(compare);