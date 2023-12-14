//code.js
function tsp_hk(distance_matrix) {
    console.log('Input Matrix:', distance_matrix);
    const n = distance_matrix.length;
    if (n <= 1) {
        return 0;
    }

    const memo = new Map();

    function heldKarp(cities, start) {
        if (cities.length === 1) {
            return distance_matrix[start][cities[0]];
        }

        const key = `${cities.join(",")}-${start}`;
        if (memo.has(key)) {
            return memo.get(key);
        }

        const subCities = cities.filter(city => city !== start);
        const tourLengths = subCities.map(city => {
            const length = heldKarp(subCities, city) + distance_matrix[start][city];
            return length;
        });

        let minLength = Math.min(...tourLengths);

        // Check if the minimum length is still Infinity
        if (minLength === Infinity) {
            minLength = 0; // Set to 0 if it's Infinity
        }

        memo.set(key, minLength);
        return minLength;
    }

    let minTourLength = Infinity;
    for (let startCity = 1; startCity < n; startCity++) {
        const tourLength = heldKarp([...Array(n).keys()].filter(city => city !== startCity), startCity);
        console.log(`Tour length starting from city ${startCity}:`, tourLength);
        minTourLength = Math.min(minTourLength, tourLength);
    }

    console.log("Final minTourLength:", minTourLength);
    return minTourLength;
}




