export = index;
declare function index(): any;
declare namespace index {
  function characters(newCharacters: any): any;
  function decode(id: any): any;
  // Circular reference from index
  const generate: any;
  function isValid(id: any): any;
  function seed(seedValue: any): any;
  function worker(workerId: any): any;
}
