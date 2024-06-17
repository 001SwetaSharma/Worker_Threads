import { parentPort, workerData } from 'worker_threads';

//1st approach - Memoization
let memo = {}; //memoization, so that the already calculated number dont have to be recurssively called again
function calFibonacci(num) { 
    if(num in memo) return memo[num];
    if(num <=1 ) return num;

    // make recurssion tree and understand the flow of memoization
    const result = calFibonacci(num-1) + calFibonacci(num-2);
    memo[num] = result;

    return result;
}

const result = calFibonacci(workerData);


//2nd Approach - Iterative approach
function calFiboIterative(num) {
    if(num <= 1) return num;

    let n1 = 0, n2 = 1, temp;
    for(let i=2; i<num; i++) {
        temp = n1 + n2;
        n1 = n2;
        n2 = temp;
    }

    console.log(`Iteration completed for ${num}:: ${temp}`);
    return temp;
}
const resultIterative = calFiboIterative(workerData);

//passing the result to parent thread
//postMessage function communicates with the main thread which is parentPort
parentPort.postMessage(resultIterative);
