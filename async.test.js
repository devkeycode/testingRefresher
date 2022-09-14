//testing async code

//testing the callback fucntion

//fetchData function takes a callback, which may be executed only after specfic period of time, here 2000ms =>2second
function fetchData(callback) {
  setTimeout(() => {
    callback("hello");
  }, 2000);
}

/**
 * Test to validate whenever the fetchData function called,whatever callback function passed as argument to fetchData ,that callback function should get string "hello" as a argument.
 *
 */

/*
//testing callback in wrong way
test("testing the argument 'hello' passed to the callback function ,passed inside the fetchData fn", () => {
  function callback(data) {
    expect(data).toBe("world"); //testing argument of the callback fucntion is "hello"

    // expect(data).toBe("hello"); //testing argument of the callback function is "hello"
  }

  fetchData(callback); //invoking the function
});

//to run a sepcifc test file
//npm test -- async.test.js

//by the time callback function is got the chance for excution in local execution context, test execution  is already over, so its not checking whether the callback test fail ro pass,test result has always pass.so in case of callback function testing.proper care has to be taken care.
//because of async nature of callback, since test is done in synchronous way, not waiting for callback to be executed.so thats why no waiting at all, as after 2 second, and callback got a chance to be in callstack for execution, test is already over.

*/

//tetsing callback in proper way, by passing an argument done in the callback function
test("testing callback properly", (done) => {
  function callback(data) {
    expect(data).toBe("hello"); //pass
    // expect(data).toBe("world"); //fail
    done(); //this will ensure that test is waiting for the callback to be executed
  }

  fetchData(callback);
});

/**
 * tESTING THE PROMISES
 */

function willBroughtNecklace() {
  return new Promise((resolve, reject) => {
    // let isWorkOver = true;
    let isWorkOver = false;
    if (!isWorkOver) {
      reject("oh!I didn't got the time, so not able to fullfill the promise.");
    }
    resolve("Here is the necklace.");
  });
}

test("testing promise", () => {
  willBroughtNecklace()
    .then((message) => {
      expect(message).toBe("Here is the necklace.");
    })
    .catch((message) => {
      expect(message).toBe(
        "oh!I didn't got the time, so not able to fullfill the promise."
      );
    });
});

//to run only a single test, and skip others tests , use .only method

test.only("testing only ", () => {
  expect(2).toBe(2);
});
