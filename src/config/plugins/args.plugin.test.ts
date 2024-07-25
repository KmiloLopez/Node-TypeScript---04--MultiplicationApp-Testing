

//En este casoqueremos hacer el test de los valores contenidos en 
//argv, sin embargo estos no tienen ningun valor ya que no se les esta enviando nada desde
//la consola y se estan ejecutando desde el test, por eso creamos
//la funcion runCommand que recibe los comando que le enviamos y los 
//mete en process.arv directamente, para poder hacer el test. 
const runCommand = async(args: string[]) =>{
    process.argv = [...process.argv, ...args];
    const {yarg} = await import ('./args.plugin');
    //si hacemos hover podemos ver el objeto de destructuracion como lo esperamos.
    return yarg
}

describe('Test args.plugin.ts', () =>{
    //hacemos un reseteo de las modificaciones antes de pasar a la siguiente prueba.
    const originalArgs = process.argv;
    beforeEach(()=>{
        process.argv = originalArgs;
        jest.resetModules();
    })
     test('should return default values', async() =>{
        const argv = await runCommand(['-b','5']);
        console.log(argv);
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }));
        
     
    });
    test('should return configuration with custom values', async() =>{
        const argv = await runCommand(['-b','5','-l','20']);

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 20,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }));
    });
});