import { ServerApp } from './presentation/server-app';


//lo unico que se encarga de comprobar es qeu ServerApp.run
//es llamado con los argumentos de yarg



describe('Test App.ts', () => {
    test('Should call Server.run with values', async() => {
        const serverRunMock = jest.fn();
        //lo asigna como .run
        ServerApp.run = serverRunMock;
        //Sobrescribe el método run de ServerApp con el mock serverRunMock. Esto asegura que cualquier llamada a ServerApp.run durante la prueba use el mock en lugar del método real.
        process.argv = ['node', 'app.ts', '-b','10','-l','5','-s','-n','test-file','-d','test-destination'];

        await import('./app');
        //Propósito: Importa el módulo app de manera dinámica (en tiempo de ejecución). Esta línea fuerza la ejecución del código en app.js con los argumentos configurados en process.argv.
//esto ejecuta const {b:base,.......etc}= yarg
//este yarg busca el process.argv que se acaba de definir.linea 14.
//por eso es que funciona esta prueba.

//se llama ServerApp.run que en este caso es el mock llamado serverRunMock que ya tiene las banderas.
        expect(serverRunMock).toHaveBeenCalledWith({
            base:10,
            limit:5,
            showTable:true,
            fileName: 'test-file',
            fileDestination: 'test-destination'
        })

    });
});