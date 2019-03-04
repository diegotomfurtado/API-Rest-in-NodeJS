test('Should to know the principal assertives from Jest.', () => {

    let number = null;
    expect(number).toBeNull();

    number = 10;
    expect(number).not.toBeNull();
    expect(number).toEqual(10);
    expect(number).toBeGreaterThan(9);
    expect(number).toBeLessThan(11);
});

test('Should to work with object', () => {
    const obj = { name: 'John', mail: 'john@gmail.com'}
    expect(obj).toHaveProperty('name');
    expect(obj.name).toBe('John'); //Se tornou um objeto primitivo
});