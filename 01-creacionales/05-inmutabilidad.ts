import { COLORS } from "../helpers/colors.ts";

/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */
class CodeEditorState{

    readonly content: string;
    readonly cursorPosition: number;
    readonly unsaveChange: boolean;

    constructor(content: string, cursorPosition: number,unsaveChange:boolean){
        this.content = content;
        this.cursorPosition = cursorPosition;
        this.unsaveChange = unsaveChange;

    }

    copyWith({content, cursorPosition, unsaveChange}:Partial<CodeEditorState>): CodeEditorState{

        return new CodeEditorState(
            content ?? this.content,
            cursorPosition ?? this.cursorPosition,
            unsaveChange ?? this.unsaveChange
        );
    }

    displayState(){
        console.log('\n%cEstado del editor:',COLORS.green);
        console.log(`
             Contenido: ${ this.content}
             Contenido: ${ this.cursorPosition}
             Unsaved changes: ${ this.unsaveChange}`);

    }
}

class CodeEditoryHistory{
    private history:CodeEditorState[] = [];
    private currentIndex: number =-1;

    save(state: CodeEditorState):void{
        
        if( this.currentIndex < this.history.length -1 ){
            this.history = this.history.splice(0,this.currentIndex + 1);
        }

        this.history.push(state);
        this.currentIndex++;
    }

    redo() : CodeEditorState | null{
        if( this.currentIndex < this.history.length -1){
            this.currentIndex++;
            return this.history[this.currentIndex];

    }

        return null;//01
    }

    undo():CodeEditorState | null {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return this.history[this.currentIndex];

        }

        return null;

    }
}


function main(){
    const history = new CodeEditoryHistory();
    let editorState = new CodeEditorState("console.log('Hola Mundo');",2,false);

    history.save(editorState);

    console.log('%cEstado del historial',COLORS.blue);

    editorState.displayState();

    editorState = editorState.copyWith({
        content:"console.log('Hola Mundo'); \nconsole.log('Nueva línea');",
        cursorPosition: 3,
        unsaveChange: true

    });

    history.save(editorState);

    console.log('\n%cDespues del primer cambio', COLORS.blue);
    editorState.displayState();

    console.log('\n%cDespues del mover el cursor', COLORS.blue);
    editorState = editorState.copyWith({cursorPosition: 5,});
    history.save(editorState);
    editorState.displayState();

    console.log('\n%cDespues del undo', COLORS.blue);
    editorState = history.undo()!;
    editorState.displayState();

    console.log('\n%cDespues del undo', COLORS.blue);
    editorState = history.redo()!;
    editorState.displayState();



}

main();