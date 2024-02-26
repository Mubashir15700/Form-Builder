function toCamelCase(str) {
    // Remove whitespace and split the string into words
    const words = str.trim().split(/\s+/);

    // Capitalize the first letter of each word except the first one
    const camelCaseWords = words.map((word, index) => {
        if (index === 0) {
            return word.toLowerCase(); // Lowercase the first word
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
    });

    // Join the words back together
    return camelCaseWords.join("");
};

export default toCamelCase;
