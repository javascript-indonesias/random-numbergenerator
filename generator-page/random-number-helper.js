// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);
    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber); // The maximum is inclusive and the minimum is inclusive
}

/**
 * Generate random number by given params in Promise
 * @param {*} {lowerlimit,upperlimit,maxcount}
 * @returns Promise<[]>
 */
async function calculationRandomByRangeInclusive({
    lowerlimit = 1,
    upperlimit = 4,
    maxcount = 1,
}) {
    return new Promise((resolve) => {
        const arrayResult = [];
        let maxCountState = 0;
        let isRandomValueAvailable = false;

        while (maxCountState < maxcount) {
            const numberRandom = getRandomIntInclusive(lowerlimit, upperlimit);

            // check data inside array to prevent double
            const arrayResultLength = arrayResult.length;

            for (let j = 0; j < arrayResultLength; j += 1) {
                const numberRandomResult = arrayResult[j];
                if (numberRandom === numberRandomResult) {
                    // this value has been stored in array, break
                    isRandomValueAvailable = true;
                    break;
                }
                isRandomValueAvailable = false;
            }

            if (!isRandomValueAvailable) {
                // value not available in array, store to array
                // push data if not duplicate
                arrayResult.push(numberRandom);
                maxCountState += 1;
            }
        }

        resolve(arrayResult);
    });
}

export { getRandomIntInclusive, calculationRandomByRangeInclusive };
