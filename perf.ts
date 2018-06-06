import * as async from "./src";
import { performance } from "perf_hooks";

const TEST_ARR_LENGTH = 100000;
const TEST_ARR = new Array(TEST_ARR_LENGTH)
  .fill(0)
  .map(() => Math.random() * 100);
const TEST_FN = (x: number) => Math.sqrt(x);

function makeTest(cb: () => Promise<void>): () => Promise<number> {
  return async () => {
    const start = performance.now();
    await cb();
    const end = performance.now();

    return end - start;
  };
}

async function runTest(name: string, testFN: () => Promise<number>, runs = 10) {
  let totalTime = 0;
  for (let i = 0; i < runs; i++) {
    totalTime = (await testFN()) + totalTime;
  }

  console.log(`Mean time for ${name}: ${totalTime / runs}`);
}

(async () => {
  const testAsyncMap = makeTest(async.map.bind(null, TEST_ARR, TEST_FN));
  const testSyncMap = makeTest(TEST_ARR.map.bind(TEST_ARR, TEST_FN));
  await runTest("async map", testAsyncMap);
  await runTest("sync map", testSyncMap);

  const testAsyncForEach = makeTest(async.forEach.bind(null, TEST_ARR, TEST_FN));
  const testSyncForEach = makeTest(TEST_ARR.forEach.bind(TEST_ARR, TEST_FN));
  await runTest("async forEach", testAsyncForEach);
  await runTest("sync forEach", testSyncForEach);
})();
