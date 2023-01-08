// Takes in a number n and returns n % m, correctly handling negative values
function trueMod(n: number, m:number):number  {
    return (n + m) % m;
}

export default trueMod;