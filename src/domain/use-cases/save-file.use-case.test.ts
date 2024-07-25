
import {SaveFile} from './save-file.use-case'
import fs from 'node:fs'

describe('SaveFileUseCase', () => {
    //Las pruebas tambien tienen un ciclo de vida
    //en este caso borra la carpeta outputs despues hacer el test.
    afterEach(() => {
        //clean up
        const fileDestinationExists =fs.existsSync('outputs');  
        if(fileDestinationExists) fs.rmSync('outputs', { recursive: true })
       
        const customFileDestiExists = fs.existsSync('custom-outputs');
        if(customFileDestiExists) fs.rmSync('custom-outputs', { recursive: true })
       
    })


    test('should save file with default values', () => {
        const saveFile = new SaveFile();//creatcion de la instancia de la clase
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content',
        }
        const result = saveFile.execute(options)
        const fileExist =fs.existsSync(filePath);
        const fileContent = fs.readFileSync( filePath, { encoding: 'utf8' });
        
        expect(result).toBe(true);
        expect(fileExist).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });
    test('should save file with custom values', ()=>{
        const options = {
            fileContent:'custom content',
            fileDestination: 'custom-outputs/file-destination',
            fileName: 'custom-table-name',
        }
        const saveFile= new SaveFile();
        const filePath = 'custom-outputs/file-destination/custom-table-name.txt';

        const result = saveFile.execute(options)
        const fileExist =fs.existsSync(filePath);
        const fileContent = fs.readFileSync( filePath, { encoding: 'utf8' });

        expect(result).toBe(true);
        expect(fileExist).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    })

    test('should return false if directory could not be created', () => {
        const options = {
            fileContent:'custom content',
            fileDestination: 'custom-outputs/file-destination',
            fileName: 'custom-table-name',
        }
        const saveFile= new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(()=>{
            throw new Error('This is a custom error message for testing');
         });

        const result = saveFile.execute(options);
        expect(result).toBe(false);
         mkdirSpy.mockRestore;
    });
    
    test('should return false if file could not be created', () => {
        const options = {
            fileContent:'custom content',
            fileDestination: 'custom-outputs/file-destination',
            fileName: 'custom-table-name',
        }
        const saveFile= new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(()=>{
            throw new Error('This is a custom error message for testing error writing file');
         });

        const result = saveFile.execute({fileContent: 'hola'});
        expect(result).toBe(false);
        writeFileSpy.mockRestore;
    });
});