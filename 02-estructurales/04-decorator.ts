import { COLORS } from '../helpers/colors.ts';
/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 * * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

interface Notification{
    send(message: string):void;
}


class BasciNootification implements Notification{
  send(message: string): void {
    console.log(`%cEnviando notificación básica: %c${message}`, COLORS.blue, COLORS.white);
  }
}

//Clase decoradora

abstract class NotificationDecorator implements Notification{
  
 protected notification: Notification;

 constructor(notification:Notification){
    this.notification = notification;
 }

  send(message: string): void {
      this.notification.send(message);
  }


}

class EmailDecorator extends NotificationDecorator{

    private sendEmail(message: string){
        console.log(`%cEnviando notificación por correo electrónico: %c${message}`,COLORS.green,COLORS.white);
    }

    override send(message: string): void {
      super.send(message);
      this.sendEmail(message);
    }

}


class SMSDecorator extends NotificationDecorator {

    private sendSMS(message: string) {
        console.log(`%cEnviando notificación por SMS: %c${message}`, COLORS.orange, COLORS.white);
    }

    override send(message: string): void {
        super.send(message);
        this.sendSMS(message);
    }

}


function main(){
    let notification: Notification = new BasciNootification();
    notification = new EmailDecorator(notification);
    notification = new SMSDecorator(notification);
    notification.send("Alerta del sistema");
}

main();