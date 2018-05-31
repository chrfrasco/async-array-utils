import map from "./map";

test("provides callback the same arguments as Array.prototype.map", async () => {
  const input = [1, 2, 3, 4];

  const cbSync = jest.fn();
  const cbAsync = jest.fn();

  input.map(cbSync);
  await map(input, cbAsync);

  expect(cbAsync.mock.calls).toEqual(cbSync.mock.calls);
});

test("produces the same result as Array.prototype.map", async () => {
  const input = [1, 2, 3, 4];
  const cb = (x: number) => x.toString(10);

  const output = await map(input, cb);
  expect(output).toEqual(input.map(cb));
});


test("maps asynchronously", () => {
  const input = [1, 2, 3, 4];
  const output: number[] = [];
  const cb = (x: number) => output.push(x);

  return new Promise(resolve => {
    map(input, cb).then(() => {
      expect(output).toEqual([0, ...input]);
      resolve();
    });
    cb(0);
  });
});
