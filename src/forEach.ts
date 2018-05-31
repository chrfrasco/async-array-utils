export default function forEach<T>(
  xs: T[],
  cb: (value: T, index?: number, array?: T[]) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    let i = 0;

    function helper() {
      if (i === xs.length) {
        return resolve();
      }

      setImmediate(() => {
        try {
          cb(xs[i], i, xs);
          i += 1;
          helper();
        } catch (e) {
          reject(e);
        }
      });
    }

    helper();
  });
}
