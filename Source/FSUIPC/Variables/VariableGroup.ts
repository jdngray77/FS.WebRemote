import { SimVariable } from "./SimVariable";

export class VariableGroup 
{
    OnUpdate(arg0: (it: any) => void) {
        // TODO
    }

    constructor
    (
        public name: string,
        public variables: SimVariable[] = []
    ){}
}