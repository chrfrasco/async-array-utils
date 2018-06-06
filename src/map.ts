export default function map<T, S>(
  xs: T[],
  cb: (value: T, index?: number, array?: T[]) => S
): Promise<S[]> {
  return new Promise((resolve, reject) => {
    const mapped: S[] = new Array(xs.length);
    let i = 0;

    function helper() {
      if (i === xs.length) {
        return resolve(mapped);
      }

      setImmediate(() => {
        try {
          mapped[i] = cb(xs[i], i, xs);
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
