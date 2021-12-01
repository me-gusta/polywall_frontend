export const beautifyNumber = (n: number, withZero: boolean = false) : string => {
    const desiredLength = 3

    if (n > 0 || (n === 0 && withZero)) {
        const t = n.toString()
        if (t.length > desiredLength) return t
        return '⠀'+ '0'.repeat(desiredLength - t.length) + t
    } else if (n === 0) {
        return '0'
    } 
    else {
        const t = Math.abs(n).toString()
        return '-' + '0'.repeat(desiredLength - t.length) + t
    }
}

export function sliceIntoChunks(arr: Array<any>, chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
