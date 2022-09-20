import { Piloto } from "./piloto.model";

export interface Auto{
    numero: number,
    color: string,
    piloto ?: Piloto,
    distancia: number,
    estatus : string,
    arrancar():void,
    actualizarDistancia(distancia :number): void,
    detener(): void

}