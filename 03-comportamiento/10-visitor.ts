import { COLORS } from './../helpers/colors.ts';
/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Visitor{
    visitRollerCosaster(rollerCoasteR: RollerCoaster): void;
    visitHauntedHouse(hauntedHouse: HauntedHouse): void;
    visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}


interface Attraction{
accept(visitor: Visitor):void;
    getPrice(): number;

}

class RollerCoaster implements Attraction {

    private price:number = 50;

    getPrice(): number{
        return this.price;
    }
    accept(visitor: Visitor): void{
       visitor.visitRollerCosaster(this);
    }


}


class HauntedHouse implements Attraction {

    private price: number = 40;

    getPrice(): number {
        return this.price;
    }
    accept(visitor: Visitor): void {
        visitor.visitHauntedHouse(this);
    }


}

class FerrisWheel implements Attraction {

    private price: number = 30;

    getPrice(): number {
        return this.price;
    }
    accept(visitor: Visitor): void {
        visitor.visitFerrisWheel(this);
    }


}


//visitor

class ChildVisitor implements Visitor{
  visitRollerCosaster(rollerCoasteR: RollerCoaster): void {
     console.log(
        `Niño en montaña Rusa: Precio con descuento de $${rollerCoasteR.getPrice() * 0.5}`
     );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
      console.log(
          `Niño en casa del terrono: Precio con descuento de $${hauntedHouse.getPrice() * 0.7}`
      );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
      console.log(
          `Niño en montaña Rueda de la fortuna : Precio con descuento de $${ferrisWheel.getPrice() * .6}`
      );
  }


}



//visitor

class AdultVisitor implements Visitor {
    visitRollerCosaster(rollerCoasteR: RollerCoaster): void {
        console.log(
            `Adulto en montaña Rusa: Precio con descuento de $${rollerCoasteR.getPrice() * 1}`
        );
    }
    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(
            `Adulto en casa del terrono: Precio con descuento de $${hauntedHouse.getPrice() * 1}`
        );
    }
    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(
            `Adulto en montaña Rueda de la fortuna : Precio con descuento de $${ferrisWheel.getPrice() * 1}`
        );
    }


}


//visitor

class SiniorVisitor implements Visitor {
    visitRollerCosaster(rollerCoasteR: RollerCoaster): void {
        console.log(
            `Adulto en montaña Rusa: Precio con descuento de $${rollerCoasteR.getPrice() * .85}`
        );
    }
    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(
            `Adulto en casa del terrono: Precio con descuento de $${hauntedHouse.getPrice() * .85}`
        )
    }
    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(
            `Adulto en montaña Rueda de la fortuna : Precio con descuento de $${ferrisWheel.getPrice() * .85}`
        );
    }


}

function main(){

    const attractions: Attraction[] = [
        new RollerCoaster,
        new HauntedHouse,
        new FerrisWheel
    ]

    console.log(`Montaña Rusa: ${new RollerCoaster().getPrice()}`);
    console.log(`Casa del terror: ${new HauntedHouse().getPrice()}`);
    console.log(`Rueda de la fortuna: ${new FerrisWheel().getPrice()}`);
    console.log('\n\n')

    console.log('\n%cVisitante Niño', COLORS.green)

    const childVisitor = new ChildVisitor();
    attractions.forEach((attraction) => attraction.accept(childVisitor));


    console.log('\n%cVisitante adulto', COLORS.green)
    const adultVisitor = new AdultVisitor();
    attractions.forEach((attraction) => attraction.accept(adultVisitor));

    console.log('\n%cVisitante adulto mayor', COLORS.green)
    const seniorVisitor = new SiniorVisitor();
    attractions.forEach((attraction) => attraction.accept(seniorVisitor));
}

main();