import { COLORS } from '../helpers/colors.ts';
import { sleep } from '../helpers/sleep.ts';
/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */


interface State {
    name: string;

    insertMoney(): void;
    selectProduct(): void;
    dispenseProduct():void;
}


class VendingMachine{
    private state: State;

    constructor(){
        this.state = new WaitingForMoney(this);
        //estado inicial
    }


    insertMoney(){
        this.state.insertMoney();

    }
    selectProduct(){
        this.state.selectProduct();

    }
    dispenseProduct(){
        this.state.dispenseProduct();
    }

    setState(state: State){
        this.state = state;
        console.log(
            `Estado  cambio a %c${state.name}`,
            COLORS.blue
        )
    }

    getStateName():string{
        return this.state.name;
    }
}

class WaitingForMoney implements State{
  name: string = 'Esperando Dinero';
  private vendingMachine: VendingMachine;

    constructor(vendingMachine:VendingMachine){
        this.vendingMachine = vendingMachine;
    }


  insertMoney(): void {
    console.log(
        'Dinero insetrado: %cAhora puedes seleccionar un producto',
        COLORS.green
    );
      this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
    //this.vendingMachine.setState()
  }
  selectProduct(): void {
    console.log('%cPrimero debes de insertar dinero',COLORS.red);
  }
  dispenseProduct(): void {
      console.log('%cPrimero debes de insertar dinero', COLORS.red);
  }

}


class ProductSelected implements State{
    name: string = 'Seleccionando Producto';
 private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine){
        this.vendingMachine = vendingMachine;
    }


    insertMoney(): void {
        console.log(
            '%cPor favor selecciona un producto - dinero ya insertado',
            COLORS.red
        );
        //this.vendingMachine.setState()
    }
    selectProduct(): void {
        this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
    }
    dispenseProduct(): void {
        console.log('%cPor favor selecciona un producto antes de despacharlo', COLORS.red);
    }

}


class DispensingProduct implements State {
    name: string = 'Despechando Producto';
    private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }


    insertMoney(): void {
        console.log(
            '%cPor favor espera a que se entregue un producto',
            COLORS.red
        );
        //this.vendingMachine.setState()
    }
    selectProduct(): void {
        console.log(
            '%cYa se ha seleccioando un producto, por favor espere',
            COLORS.red
        );
    }
    dispenseProduct(): void {
        console.log('%cProducto despachado', COLORS.red);
        this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));

    }



}

async function main(){

 const vendingMachine = new VendingMachine();

 let selectedOption:string |null = '4';

 do{

    console.clear();
    console.log(`Selecciona una opción: %c${vendingMachine.getStateName()}`,COLORS.yellow);

    selectedOption = prompt(`
        1. Insertando dinero
        2. Elgir un producto,
        3. Dispensar producto,
        4. Salir

        Opcion:  `
    );

    switch( selectedOption ){
        case '1':
            vendingMachine.insertMoney();
        break;
        case '2':
            vendingMachine.selectProduct();
            break;
        case '3':
            vendingMachine.dispenseProduct();
            break;
        case '4':
            console.log('Saliendo del sistema');
            break;

        default: 
            console.log('Favor de seleccionar una opción valida');
        break


    }
     await sleep(3000);

 } while (selectedOption != '4' );
}

main();