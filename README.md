# General Code Process

## A. [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) and/or rest endpoints are used to generate typescript interfaces

```typescript 
export interface User {
  id: string;
  name: string;
  lastLogin?: Date;
  reportIds: ReadonlyArray<string>;
  institutionSetIds: ReadonlyArray<string>;
  imageUrl?: string;
}
```

> In general I used the different primary keys in my api endpoints and attached them to their full entities for the ui in the [selector](https://github.com/ralexand56/codesample/blob/master/store/modules/selectors.ts).

## B. For the redux store I also defined the actions with their interfaces and an [enum](https://github.com/ralexand56/codesample/blob/master/types.ts) with a descriptive string in order to easily debug with chrome redux dev tools.

```typescript
export enum ActionKeys {
  USERS_RECEIVE = '[users] Receive',
  USERS_REQUEST = '[users] Request',
  USERS_ERROR = '[users] Error'
}
```

```typescript
export type Action =
  | AddReportTagAction
  | AddInstitutionSetTagAction
  | AddProductCriterionAction
  | AddRangeItemsAction;
```

```typescript
interface AddInstitutionSetTagAction {
  type: ActionKeys.INSTITUTION_SET_ADD_TAG;
  institutionSetId: string;
  tagId: string;
}

interface AddReportTagAction {
  type: ActionKeys.REPORT_ADD_TAG;
  reportId: string;
  tagId: string;
}

interface AddRangeItemsAction {
  type: ActionKeys.RANGE_ITEMS_ADD;
  id: string;
  newId: string;
}
```

## C. The redux [store](https://github.com/ralexand56/codesample/tree/master/store/modules/entities) is divided between the different entities that usually match what's stored in the relational database tables and they are setup for access by their primary keys stored as key/value objects and an array of keys. 

```typescript
export default combineReducers<UsersState, Action>({
  byId: (
    state = {
      '1': {
        id: '1',
        name: 'Test User',
        reportIds: ['1', '2', '3'],
        institutionSetIds: ['-1', '11', '12'],
        imageUrl: '/img/profile_small.jpg',
      },
    },
    action: Action
  ): Record<string, User> => {
    switch (action.type) {
      case ActionKeys.USERS_RECEIVE:
        return {
          ...state,
          ...action.users.reduce(
            (acc, x: User) => ({
              ...acc,
              [x.id]: x,
            }),
            {}
          ),
        };

      default:
        return state;
    }
  },
  allIds: (state = ['1'], action) => {
    switch (action.type) {
      case ActionKeys.USERS_RECEIVE:
        return [...state, ...action.users.map(x => x.id)];

      default:
        return state;
    }
  },
});
```

## D. The selector is then used to assemble the different entities from their keys into objects that can be easily bound to React presentational UI elements.

```typescript
export const getUserById = (state: ApplicationState) => (id: string) =>
  state.fromUsers.byId[id];
```

```typescript
const getSelectedInstitutions = (
  ids: ReadonlyArray<string>,
  state: ApplicationState,
  refId?: string
): InstitutionView[] =>
  ids
    .map(id => {
      const currSelectInstitution = getSelectInstitution(state)[id];
      const currInstitution = getInstitution(state)[
        currSelectInstitution.institutionId
      ];

      return {
        ...currInstitution,
        id: currSelectInstitution.id,
        institutionId: currSelectInstitution.institutionId,
        stateCode: currSelectInstitution.stateCode,
        isReference: refId === currSelectInstitution.id,
        isSelected: false,
        market: 0,
      };
    })
    .sort((a, b) => a.stateCode.localeCompare(b.stateCode));
```

> These selector functions can be memoized using [Reslect](https://github.com/reduxjs/reselect)

## E. Those selector functions are then connected to the React components using the Redux connector and the container pattern for separating state and presentational components.

```typescript
export default withRouter(
  connect(
    (state: ApplicationState) => ({
      currentUser: getCurrentUser(state),
      institutionSets: getInstitutionSets(state),
      myReportsIsCollapsed:
        state.fromView.institutionSetsView.myReportsIsCollapsed,
      sharedIsCollapsed: state.fromView.institutionSetsView.sharedIsCollapsed,
      deletedIsCollapsed: state.fromView.institutionSetsView.deletedIsCollapsed,
    }),
    {
      ...ReportActions,
      ...ViewActions,
    }
  )(InstitutionSetList)
);
```

```tsx
interface Props {
  className?: string;
  theme?: ThemeInterface;
  institutionTypes: InstitutionTypeView[];
  toggleInstitutionType: typeof ViewActions.toggleInstitutionType;
}

const InstitutionTypeList: SFC<Props> = ({
  className,
  theme,
  institutionTypes,
  toggleInstitutionType,
}) => (
  <ul className={className}>
    {institutionTypes &&
      institutionTypes.map(i => (
        <InstitutionTypeListItem
          theme={theme}
          onClick={() => toggleInstitutionType(i.id)}
          isChecked={i.isChecked}
          key={i.id}
        >
          {i.name}
        </InstitutionTypeListItem>
      ))}
  </ul>
);
```