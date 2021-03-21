async function doSomething() {
  return new Promise(resolve =>
      setTimeout(() => resolve('hola KODOTI'))
  );
}

let msg = await doSomething();
console.log(msg); // hola KODOTI