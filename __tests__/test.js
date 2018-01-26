describe('/ Home page', () => {

  it('should load without error', async () => {
    await page.goto(baseUrl)
    let text = await page.evaluate(() => document.body.textContent)
    expect(text).toContain('Angular Todo App')
  })
  
})

