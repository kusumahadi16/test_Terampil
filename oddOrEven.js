const oddOrEven = n => n % 2 === 0;
function angka(n){
    let outputAngka = [];
    for (let i = 1; i <= n ; i++){
        if (oddOrEven(i) === oddOrEven(n)){
            outputAngka.push(i);
        }
    }
    console.log(oddOrEven(n) === true ? "N adalah bilangan genap" : "N adalah bilangan ganjil");
    console.log(outputAngka.join(','));
}
// angka(5);
angka(10);