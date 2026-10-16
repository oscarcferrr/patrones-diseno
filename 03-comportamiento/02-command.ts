import { COLORS } from '../helpers/colors.ts';
/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

interface Command{
    execute(): void;
}

class Light{
    turnOn():void{
     console.log('%cLa luz está encendida',COLORS.yellow);
    }

    turnOff(): void {
        console.log('%cLa luz está apagada', COLORS.yellow);
    }
}

class Fan {
    on(): void {
        console.log('%cEl ventiliador está encendido', COLORS.green);
    }

    off(): void {
        console.log('%cLa ventiliador está apagado', COLORS.green);
    }
}

//comandos

class  LightOnCommand implements Command{

  constructor(private light: Light){}

  execute(): void {
    this.light.turnOn();
  }

}

class LightOffCommand implements Command {

    constructor(private light: Light) { }

    execute(): void {
        this.light.turnOff();
    }
}

class FanOnCommand implements Command {

    constructor(private Fan: Fan) { }

    execute(): void {
        this.Fan.on();
    }
}


class FanOffCommand implements Command {

    constructor(private Fan: Fan) { }

    execute(): void {
        this.Fan.off();
    }
}

class RemoteControl{
    private commands: Record<string, Command> = {};

    setCommnad(button:string, command:Command){
        this.commands[button] = command;
    }

    pressButton(button:string):void{
        if (this.commands[button]){
            this.commands[button].execute();
            return;
        }
        console.log(`%cNo se ha asignado un comando a ese boton ${button}`,COLORS.red);
    }
}


function main(){
    const remoteControl = new RemoteControl();
    const light = new Light();
    const fan = new Fan();

    const lightOnCommand = new LightOnCommand(light);
    const lightOffCommand = new LightOffCommand(light);

    const fanOnCommand = new FanOnCommand(fan);
    const fanOffCommand = new FanOffCommand(fan);

    remoteControl.setCommnad('1',lightOnCommand);
    remoteControl.setCommnad('2', lightOffCommand);
    remoteControl.setCommnad('3', fanOnCommand);
    remoteControl.setCommnad('4', fanOffCommand);

    let continueProgram = true;

    do{
        console.clear();
        const pressedButton = prompt(
            `Presiona un bóton del control:
             1. Encender luz
             2. Apagar luz
             3. Encender ventilador
             4. Apagar ventilador

             Botón:
            ` 
        ) ?? ''

        remoteControl.pressButton(pressedButton);

        const coninueProgramaResponse = prompt(
            `\n¿Deseas continuar? (y/n):`
        )?.toLowerCase();


        continueProgram = coninueProgramaResponse === 'n' ? false : true;

    }while(continueProgram);

}

main();