const arr = [1,2,3,4,5,6,7,8]
let ori = 2;

function solve(arr,ori){
    let i=0;
    while(i<arr.length){
        if(arr[i] === ori) {
            ori *= 2;
            i=0;
        }
        else{
            i++
        }
    }
    return ori;
}
console.log(solve(arr,ori));


