import { AppThunkAction } from 'src/store';
import ActionKeys, { Action, InstitutionSet } from 'src/types';

export const Actions = {
    updateInstitutionSet: (
        institutionSet: InstitutionSet
    ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {

        dispatch({ type: ActionKeys.INSTITUTION_SET_UPDATE, institutionSet });
    },
};

export default Actions;