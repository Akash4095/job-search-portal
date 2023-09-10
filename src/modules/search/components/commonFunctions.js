

export function removeDuplicatesByDegreeName(arr) {
    const uniqueItems = [];
    const seenDegreeNames = new Set();

    for (const item of arr) {
        if (!seenDegreeNames.has(item.degree_name)) {
            seenDegreeNames.add(item.degree_name);
            uniqueItems.push(item);
        }
    }

    return uniqueItems;
}


export function removeDuplicatesByCompanyName(arr) {
    const uniqueItems = [];
    const seenDegreeNames = new Set();

    for (const item of arr) {
        if (!seenDegreeNames.has(item.company)) {
            seenDegreeNames.add(item.company);
            uniqueItems.push(item);
        }
    }

    return uniqueItems;
}