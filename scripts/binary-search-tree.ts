
export default class BinarySearchTree<T> {
    private _item: T = null;
    private _cachedValue: number | string;
    private readonly _accessor: (item: T) => number | string;
    private _weight: number = 0;

    private _lower: BinarySearchTree<T> = null;
    private _higher: BinarySearchTree<T> = null;

    constructor(accessor: (item: T) => number | string, initialItem?: T) {
        this._accessor = accessor;
        if (initialItem != null) {
            this._item = initialItem;
            this._weight = 1;
        }
    }

    private compare(a: T, b: T) {
        return this._accessor(a) > this._accessor(b) ? 1 : this._accessor(a) < this._accessor(b) ? -1 : 0;
    }

    public add(item: T, cachedValue?: number | string) {
        this._weight += 1;

        if (this._item == null) {
            this._item = item;
            this._cachedValue = cachedValue;
            return;
        }

        const itemComparison = this.compare(item, this._item);

        const lowerItem = (itemComparison < 0) ? { item, cachedValue } : { item: this._item, cachedValue: this._cachedValue };
        const higherItem = (itemComparison < 0) ? { item: this._item, cachedValue: this._cachedValue } : { item, cachedValue };

        if ((this._lower?._weight ?? 0) < (this._higher?._weight ?? 0)) {
            if (this._lower == null) {
                this._lower = new BinarySearchTree<T>(this._accessor, lowerItem.item);
                this._lower._cachedValue = lowerItem.cachedValue;
            } else {
                this._lower.add(lowerItem.item, lowerItem.cachedValue);
            }

            this._item = higherItem.item;
            this._cachedValue = higherItem.cachedValue;
        } else {
            if (this._higher == null) {
                this._higher = new BinarySearchTree<T>(this._accessor, higherItem.item);
                this._higher._cachedValue = higherItem.cachedValue;
            } else {
                this._higher.add(higherItem.item, higherItem.cachedValue);
            }

            this._item = lowerItem.item;
            this._cachedValue = lowerItem.cachedValue;
        }
    }

    public remove(item: T) {
        this._weight -= 1;

        if (item === this._item) {
            if ((this._lower?._weight ?? 0) >= (this._higher?._weight ?? 0)) {
                this._item = this._lower?.getHighest();
                this._cachedValue = this._lower?.getHighestCache();

                this._lower?.remove(this._lower?.getHighest());
            } else {
                this._item = this._higher?.getLowest();
                this._cachedValue = this._higher?.getLowestCache();

                this._higher?.remove(this._higher?.getLowest())
            }

            return;
        }

        const itemComparison = this.compare(item, this._item);

        if (itemComparison <= 0 && this._lower?.hasItem(item)) {
            this._lower.remove(item);

            if ((this._lower._weight + 1) < (this._higher?._weight ?? 0)) {
                this._lower.add(this._item, this._cachedValue);

                this._item = this._higher.getLowest();
                this._cachedValue = this._higher.getLowestCache();

                this._higher.remove(this._higher.getLowest());
            }
        } else if (itemComparison >= 0 && this._higher?.hasItem(item)) {
            this._higher.remove(item);

            if ((this._higher._weight + 1) < (this._lower?._weight ?? 0)) {
                this._higher.add(this._item, this._cachedValue);

                this._item = this._lower.getHighest();
                this._cachedValue = this._lower.getHighestCache();

                this._lower.remove(this._lower.getHighest());
            }
        } else {
            throw `item (${JSON.stringify(item)}) not found in tree!`;
        }
    }

    public find(value: number | string) {
        if (value < this.getValue()) {
            return this._lower.find(value);
        } else if (value > this.getValue()) {
            return this._higher.find(value);
        } else {
            return this._item;
        }
    }

    public hasItem(item: T) {
        return this._item === item || (this._lower?.hasItem(item) ?? false) || (this._higher?.hasItem(item) ?? false);
    }

    public getLowest(): T {
        return this._lower?.getLowest() ?? this._item;
    }

    private getLowestCache(): number | string {
        if (this._lower?.getLowest() != null) {
            return this._lower.getLowestCache();
        } else {
            return this._cachedValue;
        }
    }

    public getHighest(): T {
        return this._higher?.getHighest() ?? this._item;
    }

    private getHighestCache(): number | string {
        if (this._higher?.getHighest() != null) {
            return this._higher.getHighestCache();
        } else {
            return this._cachedValue;
        }
    }

    public getValue() { 
        if (this._cachedValue == null) {
            this._cachedValue = this._accessor(this._item); 
        }
        return this._cachedValue;
    }
}