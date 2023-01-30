symbols = ['+', '-', '/', '*']
numbers = ['X','1','2','3','4','5','6','7','8','9','10']
eval_string =  'function myFunc(X) {return ;;;}  myFunc(;:;)'
test_list = []
max_limit = 5

Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});

//Read in the examples
const fs = require('fs');

fs.readFile('./examples.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let result = data.split(/\r?\n/);
  for(i in result) {
    test_case = result[i]
    let case_split = test_case.split(',');
    test_list.push([parseInt(case_split[0]), parseInt(case_split[1])])
  }
  console.log(test_list)
  test_all_funcs()
});

function test_all_funcs() {
for (let i = 0; i < max_limit; i++) {
    let nums = i + 1
    let operators = i
    var n_array = (new Array(nums)).fill(numbers[0])
    var o_array = (new Array(operators)).fill(symbols[0])
    while(true) {
        while(true) {
            let tested_func = n_array.map((element, index) => [element, o_array[index]]
).flat()
            tested_func.pop()
            tested_func_string =tested_func.join("")
            let isValid = run_tests(test_list, tested_func_string)
            if(isValid) {
                console.log(tested_func_string)
                return tested_func_string
                break
            }
            let is_n_maxed = increment_operator(n_array, numbers)
            if (is_n_maxed) {
                break
            }
        }
        let is_o_maxed = increment_operator(o_array, symbols);
        if(is_o_maxed) {
            break;
        }
    }
    
    
    
  
}
}
function increment_operator(thing_array, key_arr) {
    let len = thing_array.length
    let carries = 0
    //console.log(thing_array)
    while(carries < len) {
        let new_val = increment(thing_array[carries], key_arr)
        thing_array[carries] = new_val[0]
        if(new_val[1]) {
            carries++
            continue
        }
        break
    }
    //console.log(thing_array)
    if(carries==len) {
        return true
    }
    else {
        return false
    }

}

function increment(operator, arr) {
    let next_one = false
    for (var s in arr) {
        if (next_one==true) {
            return [arr[s], false]
        }
        else if (operator===arr[s]) {
            next_one = true
        }
    }
    let ret = [arr[0], true]
    return ret
}

function run_tests(tests, func) {
    let tested_func_test = eval_string.replace(';;;', func)
    for(let i = 0; i < tests.length; i++) {
        test_input = tests[i][0]
        test_output = tests[i][1]
        output = (eval(tested_func_test.replace(';:;', test_input.toString())))
        if(output!=test_output) {
            return false
        }
    }
    return true
    
    
}