describe('TextInput', () => {
    it('base example, visually looks correct', async () => {

        await page.goto('http://localhost:9009/iframe.html?id=todolist-textinput--task-input-story&args=&viewMode=story');

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });
});

