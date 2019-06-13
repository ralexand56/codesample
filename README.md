# General Code Process

## 1. [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) and/or rest endpoints are used to generate typescript interfaces

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

## 2. For the redux store I also defined the actions with their interfaces and an [enum] with a descriptive string in order to easily debug with chrome redux dev tools.

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