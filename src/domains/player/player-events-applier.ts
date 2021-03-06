import { DecisionProjection } from '..';
import { PlayerCreated, PlayerDeleted, PlayerUpdated } from './events';
import { generateUUID } from '../..';

export class PlayerEventsApplier {
  public static applyPlayerCreated(this: DecisionProjection, event: PlayerCreated): void {
    // TODO only allow a certain list to secure this!
    event.fields.forEach((v, k) => {
      this.data.set(k, v);
    });
    this.data.set('id', event.playerId);
    this.data.set('isDeleted', false);
    this.data.set('creationDate', new Date());
    this.data.set('lastUpdateDate', new Date());
  }
  public static applyPlayerDeleted(this: DecisionProjection, event: PlayerDeleted): void {
    this.data.set('isDeleted', true);
    this.data.set('lastUpdateDate', new Date());
  }
  public static applyPlayerUpdated(this: DecisionProjection, event: PlayerUpdated): void {
    // TODO filter fields keys to only allow a certain list !
    event.fields.forEach((v, k) => {
      this.data.set(k, v);
    });
    this.data.set('lastUpdateDate', new Date());
  }
}
