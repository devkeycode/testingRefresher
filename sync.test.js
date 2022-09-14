/**
 *  Testing -> to check expected is same as actuals.
 * with the assertions ,we check that value meets certain conditions.Assertion is basically the comparison among expected vs actuals.
 * file named to identify the test file , require, suffix as ".test.js"
 * 
 * normal structure for writing test
 * test("testDecription",callbackFunction)
 * 
 * test("test description sentence",()=>{
 * //logic for testing
 * 
 * //asertion
  expect(actualValue).toBe(actualValue);
 * })
 */

//whenver we write the npm test, jest going to locate all files with extenion .test.js and having test() mentioned over there, will execute the callback function inside that test method

const sum = require("./utils/sum");
//testing sum function

//wrting test for sum method
test("testing function sum which takes 2 arguments", () => {
  // console.log("Hello testing world");
  const expectedValue = 15;
  const actualValue = sum(9, 6);

  //asertion
  expect(actualValue).toBe(actualValue);
});


/**
 * tEsting an object
 * ensure always while testing object use toEqual(this only check for value) instead of toBe(this checks both,value and type, so generally the reference will be different if we define our own object as expectedResult,so it will never match with the actualResult and test will always fails
 */

test("testing a data object", () => {
  const expectedDataObj = {
    a: "Hello",
  };

  expectedDataObj.b = "World";

  const actualObj = { a: "Hello", b: "World" };
  // expect(expectedDataObj).toBe(actualObj);//will failed
  expect(expectedDataObj).toEqual(actualObj); //will pass
});

//using method not.toBe
test("using not.ToBe() method", () => {
  expect(sum(5, 6)).not.toBe(7);
});

//testing truthiness
//testing null value toBeNull

test("testing is the value null", () => {
  const assignee = null;
  expect(assignee).toBeNull();
});

test("testing is the value undefined", () => {
  const assignee = undefined;
  expect(assignee).toBeUndefined();
  // expect(assignee).not.toBeUndefined();//will fail
  // expect(assignee).toBeDefined();//will fail
});

/**
 * testing numerical calculation & conditonals
 */

test("2+2=4", () => {
  const sum = 2 + 2;
  // expect(sum).toBe(4);//pass
  // expect(sum).toEqual(4);//pass
  // expect(sum).toBeGreaterThan(3)//pass
  // expect(sum).toBeGreaterThanOrEqual(3)//pass
  // expect(sum).toBeLessThan(5); //pass
  expect(sum).toBeLessThanOrEqual(4); //pass
});

/**
 * Testing string, using regex to test
 */

test("There is no h in sentence -'hello world'.", () => {
  //using regex //
  // expect("hello world").toMatch(/H/);//fail //will check whether the string contains H in it
  // expect("hello world").toMatch(/H/i); //pass since using i flag here so H and h is same here, case insenstive
  // expect("hello world").toMatch(/^H/i); //pass//starts with h
  // expect("hello world").toMatch(/^W/i); //fail
  // expect("hello world").not.toMatch(/^W/i); //true
});

/**
 * Testing the iterables (Arrays)
 */

const trendingLanguages = ["java", "javascript", "rust", "go", "scala"];

//test if an item is present in array
test("trendingLanguages has javascript in it.", () => {
  // expect(trendingLanguages).toContain("javascript");//pass
  // expect(trendingLanguages).not.toContain("javascript"); //fails
});

//can also test strings using toContain
test("testing trendingLanguagae string has substring 'trending' in it", () => {
  expect("trendingLanguagae").toContain("trending"); //pass
  // expect("trendingLanguage").toContain("language");//fail
  // expect("trendingLanguage").toContain("Language");//pass
});

/**
 * Testing exception
 */

function createException() {
  throw new Error("Custom Exception");
}

test("testing the exception thrown or not", () => {
  //createException(); //invoking a function that is throwing an exception//but here not checking
  //ideal way to check exception is to used toThrow method
  //createException function is wrapping inside a function ,as this will throw execption and it will not check further agains toThrow method but if we wrapped it inside a function, and use toThrow method for that wrapped fucntion,then testing will be done correctly
  // expect(() => createException()).toThrow();
  // expect(() => createException()).toThrow(Error);
  // expect(createException).toThrow(); //will also pass
  //expect(() => "nothing").toThrow(); //will fail as Received function did not throw message
  // expect(()=>createException()).toThrow("Exception"); //pass for any substring
  // expect(()=>createException()).toThrow("random string"); //fail
});

/**
 * Sometimes requires to run any test before all the tests in a paritcular testfile , use beforeAll
 * its like a pre setup
 * example, before testing ,controllers methods, which will be needing the db connection to be made,so we can write all test cases for the controllers methods,and also write a beforeAll assertion, to check db connection first,(As all the tests will fail if db conenction itself is failed.so no use of further testing)
 */

beforeAll(() => {
  console.log("Will be called before all tests");
});

/**
 * beforeEach , is used to check something, before every test
 * beforeAll will be executed only once
 * beforeEach will be executed before everyTest case metioned, so running multiple times.
 * use case will be to check db connection here to, as it may be a case,that db connection is lost in bettwen,so better to useBeforeEach, beforeEach can also be used to reset before every test
 */

beforeEach(() => {
  console.log("beforeEach callback getting invoked beforeeveryTest");
});

//similarly afterEach (executed after each test completed, so runs mutliple times) and afterAll (executed after everything  completed,so run only once)
