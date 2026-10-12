import { COLORS } from '../helpers/colors.ts';
/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

class Projector {
    turnOn(){
        console.log('Poyector encendido');
    }

    turnOff(){
        console.log('Poyector pagado');
    }
}


class SoundSystem{
    on(){
        console.log('Sistema de sonido encendido');
    }

    off() {
        console.log('Sistema de sonido apagado');
    }
}

class VideoPlayer {
    on() {
        console.log('Video player encendido');
    }

    play(movie: string) {
        console.log(`Reproduciendo %c${ movie }`, COLORS.blue);
    }

    stop(){
        console.log('DPelicula detenida');
    }

    off(){
        console.log('Video player apagado');
    }
}

class PopcornMaker{
    poppingPopcorn(){
        console.log('Haciendo palomitas');
    
    }

    turnOffPoppingPopcorn() {
        console.log('Deteniendo las palomitas');

    }

    
}

interface HomeTheaterFacadeOptions{
     projector: Projector;
     soundSystem: SoundSystem;
     videoPlayer: VideoPlayer;
     popcornMaker: PopcornMaker;
}

class HomeTheaterFacade{

    private projector: Projector;
    private soundSystem: SoundSystem;
    private videoPlayer: VideoPlayer;
    private popcornMaker: PopcornMaker;

    constructor({
        popcornMaker,
        soundSystem,
        videoPlayer,
        projector
    }: HomeTheaterFacadeOptions){
        this.projector = projector;
        this.popcornMaker = popcornMaker;
        this.soundSystem = soundSystem;
        this.videoPlayer = videoPlayer;
    }

    watchMovie(movie: string): void{
        console.log('%cPreparado para ve la película',COLORS.blue);
        this.projector.turnOn();
        this.soundSystem.on();
        this.popcornMaker.poppingPopcorn();
        this.videoPlayer.on();
        this.videoPlayer.play(movie);

        console.log('%cDisfrute la película', COLORS.blue);
    }

    endWatchingMovie(movie: string): void {
        console.log('%c\n\nPreparado para detener la película', COLORS.blue);
        this.projector.turnOff();
        this.soundSystem.off();
        this.popcornMaker.turnOffPoppingPopcorn();
        this.videoPlayer.off();
        this.videoPlayer.stop();

        console.log('%cLa Película se detuvo\n', COLORS.blue);
    }

}


function main(){
    const projector = new Projector();
    const soundSystem=  new SoundSystem();
    const videoPlayer = new VideoPlayer();
    const popcornMaker = new PopcornMaker();

    let homeTheaterFacade = new HomeTheaterFacade({
        popcornMaker,
        soundSystem,
        videoPlayer,
        projector
});
   
  homeTheaterFacade.watchMovie('Los avengers');
  homeTheaterFacade.endWatchingMovie('Los avengers');


}

main();