import forEach from "./forEach";

test("provides callback the same arguments as Array.prototype.forEach", async () => {
  const cbSync = jest.fn();
  const cbAsync = jest.fn();

  const input = [1, 2, 3, 4];

  input.forEach(cbSync);
  await forEach(input, cbAsync);

  expect(cbAsync.mock.calls).toEqual(cbSync.mock.calls);
});

test("runs asynchronously", () => {
  const input = [1, 2, 3, 4];

  const output: number[] = [];
  const cb = (x: number) => output.push(x);

  return new Promise((resolve) => {
    forEach(input, cb).then(() => {
      expect(output).toEqual([0, ...input]);
      resolve();
    });
    output.push(0);
  });
})
