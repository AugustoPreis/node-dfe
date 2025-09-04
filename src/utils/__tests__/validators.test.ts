import { isValidString, isLiteralObject, isValidErrorArray } from '../validators';

describe('isValidString', () => {
  it('Deve retornar true para strings válidas', () => {
    expect(isValidString('teste')).toBe(true);
    expect(isValidString('123')).toBe(true);
    expect(isValidString(' teste')).toBe(true);
    expect(isValidString('teste ')).toBe(true);
    expect(isValidString(' teste ')).toBe(true);
  });

  it('Deve retornar false para valores inválidos', () => {
    expect(isValidString('')).toBe(false);
    expect(isValidString('   ')).toBe(false);
    expect(isValidString(null)).toBe(false);
    expect(isValidString(undefined)).toBe(false);
    expect(isValidString(123)).toBe(false);
  });
});

describe('isLiteralObject', () => {
  it('Deve retornar true para objetos literais', () => {
    expect(isLiteralObject({})).toBe(true);
    expect(isLiteralObject({ key: 'value' })).toBe(true);
  });

  it('Deve retornar false para valores inválidos', () => {
    expect(isLiteralObject(null)).toBe(false);
    expect(isLiteralObject(undefined)).toBe(false);
    expect(isLiteralObject(123)).toBe(false);
    expect(isLiteralObject('string')).toBe(false);
    expect(isLiteralObject([])).toBe(false);
  });
});

describe('isValidErrorArray', () => {
  it('Deve retornar true para arrays válidos de erros', () => {
    expect(isValidErrorArray([])).toBe(true);
    expect(isValidErrorArray([{ message: 'Error 1' }, { message: 'Error 2' }])).toBe(true);
    expect(isValidErrorArray([{ message: 'Error 1' }, { message: 123 }])).toBe(true);
  });

  it('Deve retornar false para arrays inválidos de erros', () => {
    expect(isValidErrorArray([{ message: 'Error 1' }, null])).toBe(false);
    expect(isValidErrorArray([{ message: 'Error 1' }, 'Error 2'])).toBe(false);
  });

  it('Deve retornar false para outros tipos de dados', () => {
    expect(isValidErrorArray(null)).toBe(false);
    expect(isValidErrorArray(undefined)).toBe(false);
    expect(isValidErrorArray(123)).toBe(false);
    expect(isValidErrorArray('string')).toBe(false);
    expect(isValidErrorArray({})).toBe(false);
  });
});