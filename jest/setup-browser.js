beforeAll(async () =>  { 
  jest.setTimeout(2400000) 
  page = await global.__BROWSER__.newPage(); 
  // Turn this on when we need to see console logs directly in npm call
  // page.on('console', (...args) => console.log.apply(console, ['[Browser]', ...args]));
})

afterAll(async () => await page.close() )
