import { COLORS } from '../helpers/colors.ts';
/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */


interface MovementStrategy{
    move(): void;
}

//Estrategia #1- Rápida pero costosa

class SwimFast implements MovementStrategy{
  move(): void {
    console.log('%cEl pato nada rápidamente sobre el agua\n',COLORS.blue);
  }

}

//Estrategia #2 - No tan rápida pero no tan costosa

class FlyOverWater implements MovementStrategy {
    move(): void {
        console.log('%cEl pato vuela elegalmente sobre el agua\n', COLORS.pink);
    }

}

//Estrategia #3 - Lenta y económmica 
class WalkClumsily implements MovementStrategy {
    move(): void {
        console.log('%cEl pato camina torpemente sobre la orilla\n', COLORS.green);
    }

}

//Consumidor de la estrategias

class Duck{
    private name: string;
    private movementStrategy: MovementStrategy;

    constructor(name: string, movementStrategy: MovementStrategy){
        this.name = name;
        this.movementStrategy = movementStrategy;
        console.log(`%c${name} %clisto para comepetir.`,COLORS.orange, COLORS.white);
    }

   performMove(){
    console.log(`${this.name} se prepara para moverse....`);
    this.movementStrategy.move();
   }


   setMovementStrategy(strategy: MovementStrategy){
    this.movementStrategy = strategy;
    console.log(`${this.name} el pato cambio de estrategia.`);
   }

}


function main(){
    const duck1 = new Duck('Patito rápido', new SwimFast());
    const duck2 = new Duck('Patito volador', new FlyOverWater());
    const duck3 = new Duck('Patito torpe', new WalkClumsily());


    console.log('%cComienza la carrera de patos!',COLORS.cyan);

    duck1.performMove();
    duck2.performMove();
    duck3.performMove();


    duck3.setMovementStrategy(new FlyOverWater);
    duck3.performMove();

    duck3.setMovementStrategy(new SwimFast);
    duck3.performMove();

}

main();