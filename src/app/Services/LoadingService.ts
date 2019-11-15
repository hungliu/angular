import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class LoadingServie {
    constructor() { }
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    show(): void {
        this.status.next(true);
    }
    hide(): void {
        this.status.next(false);
    }
}
