import { Color } from './color';
import { Marca } from './marca';

export class Articulo {
    id: number;
    nombre: string;
    marca: Marca[];
    color: Color[];
}
