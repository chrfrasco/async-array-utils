export default function map<T, S>(
  xs: T[],
  cb: (value: T, index?: number, array?: T[]) => S
): Promise<S[]> {
  return new Promise((resolve, reject) => {
    const mapped: S[] = [];
    let i = 0;

    function helper() {
      if (mapped.length === xs.length) {
        return resolve(mapped);
      }

      setImmediate(() => {
        try {
          mapped.push(cb(xs[i], i, xs));
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
