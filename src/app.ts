import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";

//Ejecuta la función main inmediatamente dentro de una IIFE 
//(Immediately Invoked Function Expression). Esto asegura que el código asíncrono se ejecute correctamente.
(async () => {
  await main();
})();


async function main() {

  const { b: base, l: limit, s: showTable, n: fileName, d: fileDestination } = yarg;


  ServerApp.run({ base, limit, showTable, fileName, fileDestination });

}