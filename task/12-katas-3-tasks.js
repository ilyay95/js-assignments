'use strict';

/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    function dfs(current, step) {
        let save = data[current.y][current.x];
        data[current.y][current.x] = "";
        if (step == search.length)
        return true;
        let result = false,
        steps = [[1, 0], [-1, 0], [0, -1], [0, 1]];
        for (let i = 0; i < 4; i++) {
        let newX = current.x + steps[i][0],
        newY = current.y + steps[i][1];
        if (data[newY][newX] == search[step]) {
            result = result || dfs({x: newX, y: newY}, step + 1);
            }
        }
        data[current.y][current.x] = save;
        return result;
    }
    let data = Array.from(puzzle);
    let Arrtmp = Array.from({length: data[0].length + 2}, () => '');
    data = data.map(item => [''].concat(item.split(''), ['']));
    data = [Arrtmp].concat(data, [Arrtmp]);
    let search = searchStr.split(''),
    n = data[0].length - 1,
    m = data.length - 1;
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++)
        if (data[i][j] == search[0]) {
                if (dfs({y: i, x: j}, 1))
                return true;
            }
    }

    return false;
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 * 
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    let ret = Perm(chars);
    for (let i = 0; i < ret.length; i++) {
        yield ret[i];
    }
    function Perm(str) {
        let ret = [];
    
        if (str.length == 1) return [str];
        if (str.length == 2) return str != str[1] + str[0] ? [str, str[1] + str[0]] : [str];
    
        str.split('').forEach(function (chr, idx, arr) {
            let sub = [...arr];
            sub.splice(idx, 1);
            Perm(sub.join('')).forEach(function (perm) {
                ret.push(chr + perm);
            });
        });
    
        return ret.filter((elem, pos, arr) => {
            return arr.indexOf(elem) == pos;
        });
    }
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing. 
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 * 
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
  let buffArr = [];
  let resultNumber = 0;
  for(let i=1; i<quotes.length; i++){
    let currentBuy = quotes[i];
    for( let j=i-1; j>=0; j--){
      if(currentBuy < quotes[j] && j>0){
        currentBuy = quotes[j];
        continue;
      }
      buffArr.push(currentBuy-quotes[j]);
    }
    let buffSum = buffArr.reduce(function(sum, current){
      return sum+current;
    }, 0);
    buffArr = [];
    if(buffSum>resultNumber) resultNumber = buffSum;
  }
  return resultNumber;
}



/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 * 
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function (url) {
        let result = new String();
        let char1, char2, newChar;
        for (let i = 0; i + 1 < url.length; i += 2) {
            char1 = url.charCodeAt(i);
            char2 = url.charCodeAt(i + 1);
            newChar = (char1 << 8) + char2;
            result += String.fromCharCode(newChar);
        }
        if (url.length % 2 == 1) {
            result += String.fromCharCode(url.charCodeAt(url.length - 1) << 8);
        }
        return result;
    },

    decode: function (code) {
        let result = new String();
        let char1, char2, oldChar;
        for (let i = 0; i < code.length; i++) {
            oldChar = code.charCodeAt(i);
            char2 = oldChar & 255;
            char1 = oldChar >> 8;
            result += String.fromCharCode(char1) + ((char2 == 0) ? '' : String.fromCharCode(char2));
        }
        return result
    }
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
