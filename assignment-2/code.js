/**
 * @module SENG 513 - Assignment 2
 * @author Zachary Aries
 */


/**
 * Gets a list of stats from a text string
 *
 * @param txt
 * @returns {{
 *      nChars: (Number|*),
 *      nWords: (Number|*),
 *      nLines: (number|*),
 *      nNonEmptyLines: (number|*),
 *      maxLineLength: (number|*),
 *      averageWordLength: (number|*),
 *      palindromes: (Array|*),
 *      longestWords: (Array|*),
 *      mostFrequentWords: (Array|*)}}
 */
function getStats(txt) {
    txt = txt.toLowerCase();
    var nChars,nWords, nLines, nNonEmptyLines, averageWordLength, maxLineLength;
    var palindromes, longestWords,mostFrequentWords;

    // Character count
    nChars = txt.length;

    // Word Count
    nWords = getWordsFromText(txt).length;

    // Line Count
    nLines = getNLines(txt);

    // Non Empty Line Count
    nNonEmptyLines = getNNonEmptyLines(txt);

    // Max Line Length Count
    maxLineLength = getMaxLineLength(txt);

    // Average Word Length
    averageWordLength = calcAvgWordLength(txt);

    // Get all paladromes
    palindromes = getPalindromes(txt);

    // Get longest words
    longestWords = getLongestWords(txt);

    // Get the most frequent words
    mostFrequentWords = getMostFrequentWords(txt);

    return {
        nChars: nChars,
        nWords: nWords,
        nLines: nLines,
        nNonEmptyLines: nNonEmptyLines,
        maxLineLength: maxLineLength,
        averageWordLength: averageWordLength,
        palindromes: palindromes,
        longestWords: longestWords,
        mostFrequentWords: mostFrequentWords
    };
}

/**
 * Returns the numbers of lines in a string
 *
 * The only time this will be ‘0’ is when the text is empty.
 * For example, the string "Hello\nWorld" contains 2 lines.
 * The string "Hello\nWorld\n" contains 3 lines.
 * The string "\n" contains 2 lines.
 *
 * @param string
 * @returns {number}
 */
function getNLines(string) {

    // if there are no \s chars return 0
    // \s includes \t \n & others
    if (!/[\s]/.test(string)) {
        return 0;
    }

    // if there are \s chars find how many \n characters there are and add 1
    return (string.match(/\n/g) || []).length + 1;
}

/**
 * Returns the number of lines in the text containing at
 * least one visible character. A character as any character
 * other than whitespace (space, new-line and tab).
 *
 * @param string
 * @returns {*}
 */
function getNNonEmptyLines(string) {
    // count the instances where any amount of character is followed by a \n
    // this will get the total number of new lines in a string
    var lineCount = (string.match(/[^\s]+[^\n]*\n+/gi) || []).length; // append [] in case string is empty

    // if the previous doesnt find any \n chars preceded by non \s chars
    // check to see if there are any alphanumeric or special characters in the string ended without a \n char
    if ((/[^\s]+[^\n]*$/).test(string)) {
        return lineCount + 1; // if there is, then return line count + 1
    }
    return lineCount;
}

/**
 * Returns length of the longest line. Line length will be computed by
 * counting the number of characters in the line, including any trailing
 * white spaces, but excluding the newline character ‘\n’.
 *
 * @param string
 * @returns {number}
 */
function getMaxLineLength(string) {
    var max, count;
    max = 0;
    count = 0;

    // iterate through all characters in the string string
    for (var i = 0; i < string.length; i++) {
        // look for \n char
        if (string[i] === '\n') {
            // if a \n char is found, that is the end of the line
            // check to see if the current count is larger than the max
            if (count > max) {
                // if so, replace max with the current count
                max = count;
            }
            // set count to 0 since we are on a new line
            count = 0;
        }else{
            // if no \n char is found, increase the line count by one
            count ++;
        }
    }

    // if there was no \n char at the end of the string then
    // check if the current count > max
    if (count > max) {
        max = count;
    }

    // return the max line count
    return max;
}

/**
 * Returns average word length in a string
 * Example: text “Hello, World 1!” would have average
 * word length equal to (5+5+1)/3 = 3.666666.
 *
 * @param string
 * @returns {number}
 */
function calcAvgWordLength(string) {
    // get all words in string and place in an array
    var words = getWordsFromText(string);
    // if there are no words in array return 0
    if (!words.length)
        return 0;

    // sum up all words in words array and divide by number of items
    var sum = 0;
    for (var i = 0; i < words.length; i++) {
        sum += words[i].length;
    }



    return sum / words.length;
}

/**
 * Returns an array of palindromes
 * A palindrome is a word with length > 2, which reads the
 * same forward and backwards.
 *
 * @param string
 * @returns {Array}
 */
function getPalindromes(string) {
    // get all words in string and place in an array
    var words = getWordsFromText(string);

    // create array to store palindromes
    var palindromes = [];

    // iterate through each word in array
    for (var i = 0; i < words.length; i++) {
        // check if word is a palindrome
        if (isPalindrom(words[i])){
            // if so, push to the end of array
            palindromes.push(words[i]);
        }
    }

    return palindromes;
}


/**
 * Returns array of the 10 longest words in string. In case of ties,
 * the secondary sorting criteria should be alphabetical sorting.
 * Example: “0, XXX, YYYY, AAAA, BBB” will yield a list: [“aaaa”, “yyyy”, ”bbbb”,“xxx”, ”0”].
 *
 * @param string
 * @returns {Array}
 */
function getLongestWords(string) {
    // get all words in string and place in an array
    var words = getWordsFromText(string);
    var longestWords = [];

    // sort word array by alphabetical order, this way we already have
    // the "tie" criteria met
    words.sort();

    // iterate through all words in array
    for (var i = 0; i < words.length; i++) {
        // check to see if current word already exists in longest word array
        // if so, skip current word
        if (longestWords.indexOf(words[i]) < 0) {
            // iterate through longestWord array
            // stop at 10, as we only want to return 10 items
            for (var j = 0; j < 10; j++) {
                if (typeof longestWords[j] === 'undefined') {
                    // if index @ j in longestWord array is empty
                    // insert word into longestWord array @ index j
                    // and break j loop
                    longestWords[j] = words[i];
                    break;
                } else if (words[i].length > longestWords[j].length) {
                    // if the current word is longer than the word @ index j in
                    // longestWord array insert current word @ index j
                    longestWords.splice(j, 0, words[i]);

                    // if pushing the current word into longestWord array
                    // causes longestWord array length to be > 10 delete the last
                    // index. We only want to return 10 items
                    if (longestWords.length > 10) {
                        longestWords.splice(10,1);
                    }
                    break;
                }
            }
        }
    }

    return longestWords;
}

/**
 * Returns the 10 most frequent words in the string, concatenated with their respective frequencies.
 * Uses alphabetic sorting to to resolve frequency ties. The results will include the corresponding
 * frequencies appended to the actual words surrounded by brackets.
 * Example: the text “The,the,THE,and,AND,and,it,IT”
 * should yield: [“and(3)”, “the(3)”, “it(2)”].
 *
 * @param string
 * @returns {Array}
 */
function getMostFrequentWords(string) {
    // get all words in string and place in an array
    var words = getWordsFromText(string);
    var mostFrequentWords = [];
    var mostFrequentWordsFormatted = [];

    // Flag to check if word is already in mostFrequentWords array
    var match;
    // iterate through all words
    for (var i = 0; i < words.length; i++) {
        // set match to false initially,
        // push word into mostFrequentWords is the default
        match = false;

        // iterate through entries in mostFrequent words to
        // see if a word already exists in array
        for (var j = 0; j < mostFrequentWords.length; j++) {
            if(words[i] === mostFrequentWords[j][0]){
                // if so increment the current words frequency
                mostFrequentWords[j][1] ++;
                // set match flag and exit match in mostFrequentWords search
                match = true;
                break;
            }
        }

        // if a match wasn't found for the current word in
        // mostFrequentWords array insert an array into mostFrequentWords
        // inserted array:
        // item[0] = word
        // item[1] = frequency
        if (!match) {
            var item = new Array(2);
            item[0] = words[i];
            // if new word in mostFrequentWords array then the frequency is initially 1
            item[1] = 1;

            // append item to the end of mostFrequentWords array
            mostFrequentWords.push(item);
        }
    }

    // sort mostFrequentWords array with custom function
    mostFrequentWords.sort(function(a, b){
        // if both words are the same length then sort alphabetically
        if ((b[1]-a[1]) === 0)
            return a[0].localeCompare(b[0]);

        // otherwise sort by greater frequency
        return b[1]-a[1];
    });

    // grab the first 10 items in mostFrequentWords array
    for (var k = 0; (k < 10) && (k < mostFrequentWords.length); k++){
        // format item in list as outlined in the function docs
        mostFrequentWordsFormatted[k] = mostFrequentWords[k][0] + "("+mostFrequentWords[k][1]+")";
    }

    return mostFrequentWordsFormatted;
}

/*-------------------------------
        Helper Functions
 -------------------------------*/
/**
 * Returns an array of words from a string
 * Words contain one or more sequential occurrences of an alphanumeric char
 *
 * @param string
 * @returns {Array|{index: number, input: string}|Array}
 */
function getWordsFromText(string) {
    return string.match(/[0-9a-z]{1,}/gi) || [];
}

/**
 * Returns true if a word is a palindrome, false otherwise
 * A palindrome is a word with length > 2, which reads the
 * same forward and backwards.
 *
 * @param word
 * @returns {boolean}
 */
function isPalindrom(word) {
    word = word.toLowerCase();
    if (word.length < 3 )
        return false;

    // checks to see if a reversed word is the same as the original
    return word === word.split('').reverse().join('');
}

