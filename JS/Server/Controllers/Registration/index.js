console.log("Hello world")
console.log("Hello world")


console.log("Hello world from vishal")

const sum = (a,b) => {
    if(typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)){
        return {
            error: true,
            message: 'Both arguments must be numbers',
            code: 400
        };
    }
    if(a === Infinity || b === Infinity){
        return {
            error: true,
            message: 'Infinity values are not supported',
            code: 400
        };
    }
    if(a === null || b === null){
        return {
            error: true,
            message: 'Both arguments must not be null',
            code: 400
        };
    }
    if(typeof a === 'undefined' || typeof b === 'undefined'){
        return {
            error: true,
            message: 'Both arguments must be defined',
            code: 400
        };
    }
    return a+b;
}