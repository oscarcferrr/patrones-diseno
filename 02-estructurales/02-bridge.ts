/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";


interface Ability{
    use(): void;
}

class SwordAttack implements Ability{
  use(): void {
    console.log('Ataca con una %cespada ferzomente', COLORS.blue);
  }

}

class MagicSpell implements Ability {
    use(): void {
        console.log('Lanza un hechizo %cmagico poderoso', COLORS.green);
    }
}

class FireBallSpell implements Ability {
  use(): void {
    console.log('Lanza una %cbola de fuego', COLORS.orange);
  }
}

class AxeAtac implements Ability {
  use(): void {
    console.log('Ataca con una %chacha ferzomente', COLORS.brown);
  }

}


abstract class Character{
  protected ability: Ability;

  constructor(ability: Ability){
    this.ability = ability;
  }

  setAbility( ability: Ability):void {
     this.ability = ability;
  }

  abstract perfomAbility():void;
  

} 


class Warrior extends Character{

  override perfomAbility(): void {
    console.log('El gurrero está listo para luchar');
    this.ability.use();
  }


}


class Mage extends Character {

  override perfomAbility(): void {
    console.log('El mago prepara su magia');
    this.ability.use();
  }

}


function main(){

  const warrior = new Warrior(new SwordAttack());
  warrior.perfomAbility();

  warrior.setAbility(new AxeAtac);
  warrior.perfomAbility();

  const mage = new Mage(new MagicSpell());
  mage.perfomAbility();

  mage.setAbility(new FireBallSpell);
  mage.perfomAbility();
}

main();