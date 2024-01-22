import { describe, it, expect } from 'vitest'
// describe: permite agrupar distintos test
// it: pequeñas porciones de codigo que comprueban algo dentro del componente
// expect: aserción, forma de decir que se quiere probar el codigo que se escribe
describe('Router', () => {
  it('should add two number', () => {
    expect(1 + 1).toBe(2)
  })
})
