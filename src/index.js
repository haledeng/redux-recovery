import storage from './libs/Storage';
import * as CONSTANTES from './constantes';

export default persistor = (recordAction = true) => {
    this.persistActionType = CONSTANTES.PERSIST_STORE;
    this.recordAction = config.recordAction;
    this.nbSavedActions = config.nbSavedActions;
    storage.initLocalStorage();
}

export const persistWithConditions = (currentState, action) => {
  if (!currentState) return;

  if (action.type == this.persistActionType) {
    this.setStorage(currentState);
  }
}

export const start = store => next => (action) => {
  const result = next(action);
  const currentState = store.getState();
  persistWithConditions(currentState, action);
  if (this.recordAction) {
    this.persistAction(action);
  }
  return result;
};

export const persistAction = action => {
  if (!action) return;
  const actionArray = this.getStorage('REDUX_RECOVER_ACTION') || [];

  if (actionArray.length == this.nbSavedActions) {
    actionArray.shift(action);
  } else {
    actionArray.push(action);
  }
  storage.setStorage('REDUX_RECOVER_ACTION', actionArray.reverse());
}
