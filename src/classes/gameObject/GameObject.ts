import { GameObjectType, IndustryBranch, Lock, Price, ILockable } from '../baseClasses';
import IGameObjectState from './IGameObjectState';
import IGameObjectTemplate from "./IGameObjectTemplate";
import { ComplexPrice } from '../complexPrices';

export default abstract class GameObject implements IGameObjectTemplate, IGameObjectState, ILockable {
    id: string;
    type: GameObjectType;
    name: string;
    desc: string;
    branch: IndustryBranch;
    rawCost: Price;
    cost: ComplexPrice;
    buyVerb: string;
    originalLocks: Lock[];

    locks: Lock[];

    abstract currentPrice: Price;

    constructor(template: IGameObjectTemplate, state: IGameObjectState) {
        this.id = template.id;
        this.type = template.type;
        this.name = template.name;
        this.desc = template.desc;
        this.branch = template.branch;
        this.rawCost = template.rawCost;
        this.buyVerb = template.buyVerb;
        this.originalLocks = template.originalLocks;

        if (typeof state.cost !== 'undefined') {
            this.cost = new ComplexPrice(state.cost);
        } else {
            this.cost = new ComplexPrice({ basePrice: template.rawCost });
        }

        if (typeof state !== 'undefined' && typeof state.locks !== 'undefined') {
            this.locks = state.locks.slice();
        } else {
            this.locks = template.originalLocks.slice();
        }
    }

    abstract save(): IGameObjectState;
    abstract isAvailable(): boolean;
}
