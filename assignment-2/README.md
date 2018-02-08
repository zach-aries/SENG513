# SENG 513 W17 Assignment 2

### getStats(txt) 

Gets a list of stats from a text string

**Parameters**

**txt**: , Gets a list of stats from a text string

**Returns**: `Object`


### getNLines(string) 

Returns the numbers of lines in a string

The only time this will be ‘0’ is when the text is empty.
For example, the string "Hello\nWorld" contains 2 lines.
The string "Hello\nWorld\n" contains 3 lines.
The string "\n" contains 2 lines.

**Parameters**

**string**: , Returns the numbers of lines in a string

The only time this will be ‘0’ is when the text is empty.
For example, the string "Hello\nWorld" contains 2 lines.
The string "Hello\nWorld\n" contains 3 lines.
The string "\n" contains 2 lines.

**Returns**: `number`


### getNNonEmptyLines(string) 

Returns the number of lines in the text containing at
least one visible character. A character as any character
other than whitespace (space, new-line and tab).

**Parameters**

**string**: , Returns the number of lines in the text containing at
least one visible character. A character as any character
other than whitespace (space, new-line and tab).

**Returns**: `*`


### getMaxLineLength(string) 

Returns length of the longest line. Line length will be computed by
counting the number of characters in the line, including any trailing
white spaces, but excluding the newline character ‘\n’.

**Parameters**

**string**: , Returns length of the longest line. Line length will be computed by
counting the number of characters in the line, including any trailing
white spaces, but excluding the newline character ‘\n’.

**Returns**: `number`


### calcAvgWordLength(string) 

Returns average word length in a string
Example: text “Hello, World 1!” would have average
word length equal to (5+5+1)/3 = 3.666666.

**Parameters**

**string**: , Returns average word length in a string
Example: text “Hello, World 1!” would have average
word length equal to (5+5+1)/3 = 3.666666.

**Returns**: `number`


### getPalindromes(string) 

Returns an array of palindromes
A palindrome is a word with length > 2, which reads the
same forward and backwards.

**Parameters**

**string**: , Returns an array of palindromes
A palindrome is a word with length > 2, which reads the
same forward and backwards.

**Returns**: `Array`


### getLongestWords(string) 

Returns array of the 10 longest words in string. In case of ties,
the secondary sorting criteria should be alphabetical sorting.
Example: “0, XXX, YYYY, AAAA, BBB” will yield a list: [“aaaa”, “yyyy”, ”bbbb”,“xxx”, ”0”].

**Parameters**

**string**: , Returns array of the 10 longest words in string. In case of ties,
the secondary sorting criteria should be alphabetical sorting.
Example: “0, XXX, YYYY, AAAA, BBB” will yield a list: [“aaaa”, “yyyy”, ”bbbb”,“xxx”, ”0”].

**Returns**: `Array`


### getMostFrequentWords(string) 

Returns the 10 most frequent words in the string, concatenated with their respective frequencies.
Uses alphabetic sorting to to resolve frequency ties. The results will include the corresponding
frequencies appended to the actual words surrounded by brackets.
Example: the text “The,the,THE,and,AND,and,it,IT”
should yield: [“and(3)”, “the(3)”, “it(2)”].

**Parameters**

**string**: , Returns the 10 most frequent words in the string, concatenated with their respective frequencies.
Uses alphabetic sorting to to resolve frequency ties. The results will include the corresponding
frequencies appended to the actual words surrounded by brackets.
Example: the text “The,the,THE,and,AND,and,it,IT”
should yield: [“and(3)”, “the(3)”, “it(2)”].

**Returns**: `Array`


### getWordsFromText(string) 

Returns an array of words from a string
Words contain one or more sequential occurrences of an alphanumeric char

**Parameters**

**string**: , Returns an array of words from a string
Words contain one or more sequential occurrences of an alphanumeric char

**Returns**: `Array | Object | Array`


### isPalindrom(word) 

Returns true if a word is a palindrome, false otherwise
A palindrome is a word with length > 2, which reads the
same forward and backwards.

**Parameters**

**word**: , Returns true if a word is a palindrome, false otherwise
A palindrome is a word with length > 2, which reads the
same forward and backwards.

**Returns**: `boolean`



* * *










