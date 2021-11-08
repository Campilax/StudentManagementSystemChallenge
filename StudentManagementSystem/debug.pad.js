// function secondsToString(seconds) {
//     var value = seconds;

//     var units = {
//         "year": 365 * 24 * 60 * 60,
//         "month": 2.628e+6,
//         "week": 7 * 24 * 60 * 60,
//         "day": 24 * 60 * 60,
//         "hour": 60 * 60,
//         "minute": 60,
//         "second": 1
//     }

//     var result = []
//     for (var name in units) {
//         var p = Math.floor(value / units[name]);
//         const item = {};
//         item[name] = p;
//         result.push(item);
//     }
//     return result;
// }

var secondsToString = (value) => {
    const seconds = value;

    const units = {
        "year": 365 * 24 * 60 * 60,
        "month": 2.628e+6,
        "week": 7 * 24 * 60 * 60,
        "day": 24 * 60 * 60,
        "hour": 60 * 60,
        "minute": 60,
        "second": 1
    }

    const result = []
    Object.keys(units).forEach((name, index) => {
        const value = Math.ceil(seconds / units[name]);
        const item = {
            key: (value <= 1)? name : name + 's',
            value: value
        };
        result.push(item);
    });
    return result; //.filter(x => x.value > 0).shift();
};

const value = (25 * (60 * 60)); //2000000000
// secondsToString(value);
console.log(secondsToString(value));