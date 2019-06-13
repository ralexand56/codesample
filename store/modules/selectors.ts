import { idExists } from 'src/modules/common/Helpers';
import { sampleProducts } from 'src/sampledata';
import {
  County,
  CountyView,
  Feature,
  HoldingCompanyView,
  Institution,
  InstitutionSet,
  InstitutionSetView,
  InstitutionStateMarket,
  InstitutionType,
  InstitutionTypeView,
  InstitutionView,
  ProductCriterion,
  ProductCriterionView,
  ProductDemoView,
  RangeItem,
  Report,
  ReportsViewState,
  ReportView,
  SortBy,
  StateView,
  Tag,
  TagView,
  User,
} from 'src/types';
import { ApplicationState } from '..';
import ReportActions from './entities/reports/actions';

export const getInstitution = (state: ApplicationState) =>
  state.fromInstitutions.byId;

const getCounty = (state: ApplicationState) => state.fromCounties.byId;

const getProductCriterionById = (state: ApplicationState) => (id: string) =>
  state.fromProductCriteria.byId[id];

const getReport = (state: ApplicationState) => (id: string) =>
  state.fromReports.byId[id];

const getSelectInstitution = (state: ApplicationState) =>
  state.fromSelectInstitutions.byId;

export const getInstitutionSet = (state: ApplicationState) =>
  state.fromInstitutionSets.byId;

export const getTagById = (state: ApplicationState) => (id: string) =>
  state.fromTags.byId[id];

export const getUserById = (state: ApplicationState) => (id: string) =>
  state.fromUsers.byId[id];

export const getCounties = (state: ApplicationState): CountyView[] =>
  state.fromCounties.allIds
    .map(c => {
      const currCounty: County = state.fromCounties.byId[c];

      return {
        ...currCounty,
        stateName: state.fromStates.byId[currCounty.stateCode].name,
        isSelected: state.fromView.institutionSelectView.countyIds.includes(c),
        stateIsSelected: state.fromView.institutionSelectView.stateCodes.includes(
          currCounty.stateCode
        ),
        toString: () => state.fromStates.byId[currCounty.stateCode].name,
        nameSelection: {
          name: state.fromStates.byId[currCounty.stateCode].name,
          isSelected: state.fromView.institutionSelectView.stateCodes.includes(
            currCounty.stateCode
          ),
        },
      };
    })
    .sort(
      (a, b) =>
        a.stateName.localeCompare(b.stateName) || a.name.localeCompare(b.name)
    );

export const getCurrentUser = (state: ApplicationState): User =>
  state.fromUsers.byId[state.fromView.reportsView.currentUserId];

export const filterInstitutionsByState = (s: string) => (i: Institution) =>
  i.stateCodes.findIndex(x => x === s) > -1
    ? { ...i, stateCode: s }
    : undefined;

export const createInstitutionSetView = (
  institutionSet: InstitutionSet,
  selectedIds: ReadonlyArray<string>,
  t: Readonly<Record<string, Tag>>,
  institution: Readonly<Record<string, Institution>>,
  selectInstitution: Readonly<Record<string, InstitutionStateMarket>>,
  searchTxt: string,
  getUser: Readonly<Record<string, User>>,
  currentReportId?: string
): InstitutionSetView => {
  const institutions: InstitutionView[] = institutionSet.selectInstitutionIds
    .map(x => {
      // console.dir(x);
      const currSelectInstitution = selectInstitution[x];

      const currInstitution = institution[currSelectInstitution.institutionId];

      return {
        ...currInstitution,
        id: currSelectInstitution.id,
        institutionId: currSelectInstitution.institutionId,
        stateCode: currSelectInstitution.stateCode,
        isReference:
          institutionSet.referenceSelectInstitutionId ===
          currSelectInstitution.id,
        isSelected: false,
        market: 0,
      };
    })
    .sort((a, b) => a.stateCode.localeCompare(b.stateCode));

  const institutionSetView: InstitutionSetView = {
    ...institutionSet,
    institutions,
    isCurrent: institutionSet.id === currentReportId,
    isSelected: selectedIds.includes(institutionSet.id),
    onClick: ReportActions.selectReport,
    tags: institutionSet.tagIds.map(x => ({
      ...t[x],
      isSelected: true,
      allowDelete: false,
      allowSelect: false,
    })),
    user: getUser[institutionSet.userid],
  };

  return institutionSetView;
};

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

const getTagView = (t: Tag) => ({
  ...t,
  isSelected: true,
  allowDelete: false,
  allowSelect: false,
});

const reportIsSelected = (
  id: string,
  selectedReportIds: ReadonlyArray<string>
) => selectedReportIds.includes(id);

export const getReportView = (state: ApplicationState) => (
  rep: Report
): ReportView => ({
  ...rep,
  productCriterion: getProductCriterionById(state)(rep.productCriterionId),
  productCriteria: rep.productCriterionIds.map(getProductCriterionById(state)),
  selectedProductCriteria: rep.selectedProductCriterionIds.map(
    getProductCriterionById(state)
  ),
  institutions: getSelectedInstitutions(
    rep.selectInstitutionIds,
    state,
    rep.referenceSelectInstitutionId
  ),
  isCurrent: rep.id === state.fromView.reportsView.currentReportId,
  isSelected: reportIsSelected(
    rep.id,
    state.fromView.reportsView.selectedReportIds
  ),
  onClick: ReportActions.selectReport,
  tags: rep.tagIds.map(getTagById(state)).map(getTagView),
  user: getUserById(state)(rep.userid),
});

const filterEntityBySearchText = (searchTxt: string) => (
  entity: ReportView | InstitutionSetView
) => entity.name.toLocaleLowerCase().includes(searchTxt.toLocaleLowerCase());

const getReportsSorted = ({ sortType }: ReportsViewState) => (
  a: ReportView | InstitutionSetView,
  b: ReportView | InstitutionSetView
) =>
  sortType === SortBy.name
    ? a.name.localeCompare(b.name)
    : sortType === SortBy.modified
      ? new Date(a.modifiedDate) > new Date(b.modifiedDate)
        ? -1
        : new Date(a.modifiedDate) < new Date(b.modifiedDate)
          ? 1
          : 0
      : sortType === SortBy['last run']
        ? a.lastRunDate &&
          b.lastRunDate &&
          new Date(a.lastRunDate) > new Date(b.lastRunDate)
          ? -1
          : a.lastRunDate &&
            b.lastRunDate &&
            new Date(a.lastRunDate) < new Date(b.lastRunDate)
            ? 1
            : 0
        : 0;

const getReportByTags = ({ selectedTagIds }: ReportsViewState) => (
  rep: ReportView
): boolean =>
  selectedTagIds.length > 0
    ? rep.tagIds.some(t => selectedTagIds.includes(t))
    : true;

export const getReports = (state: ApplicationState): ReportView[] =>
  getCurrentUser(state)
    ? getCurrentUser(state)
        .reportIds.map(getReport(state))
        .map(getReportView(state))
        .filter(filterEntityBySearchText(state.fromView.reportsView.searchTxt))
        .filter(getReportByTags(state.fromView.reportsView))
        .sort(getReportsSorted(state.fromView.reportsView))
    : [];

const myReportFilter = (currentUserID: string) => (r: Report) =>
  (!r.isShared || r.userid === currentUserID) && !r.isDefault && !r.isDeleted;

export const getMyReports = (state: ApplicationState) =>
  getReports(state).filter(myReportFilter(getCurrentUser(state).id));

const mySharedReportFilter = (currentUserID: string) => (r: Report) =>
  r.isShared && !r.isDefault && r.userid !== currentUserID;

export const getSharedReports = (state: ApplicationState) =>
  getReports(state).filter(mySharedReportFilter(getCurrentUser(state).id));

const myDeletedReportFilter = (r: Report) =>
  r.isDeleted && !r.isShared && !r.isDefault;

export const getMyDeletedReports = (state: ApplicationState) =>
  getReports(state).filter(myDeletedReportFilter);

export const getCurrentReport = (
  state: ApplicationState
): ReportView | undefined =>
  state.fromView.reportsView.currentReportId
    ? getReportView(state)(
        getReport(state)(state.fromView.reportsView.currentReportId)
      )
    : undefined;

export const getCurrentDetailReport = (
  state: ApplicationState
): ReportView | undefined =>
  state.fromView.reportsView.reportDetailId
    ? getReportView(state)(
        getReport(state)(state.fromView.reportsView.reportDetailId)
      )
    : undefined;

export const getCurrentDetailInstitutionSet = (
  state: ApplicationState
): InstitutionSetView | undefined => {
  const currInstitutionSet = state.fromView.institutionSetsView
    .institutionSetDetailId
    ? getInstitutionSet(state)[
        state.fromView.institutionSetsView.institutionSetDetailId
      ]
    : undefined;

  return currInstitutionSet
    ? createInstitutionSetView(
        currInstitutionSet,
        state.fromView.institutionSetsView.selectedReportIds,
        state.fromTags.byId,
        state.fromInstitutions.byId,
        state.fromSelectInstitutions.byId,
        state.fromView.institutionSelectView.selectedSearchStr,
        state.fromUsers.byId,
        currInstitutionSet.id
      )
    : undefined;
};

export const getCurrentInstitutionSet = (
  state: ApplicationState
): InstitutionSetView | undefined => {
  const currInstitutionSet = state.fromView.institutionSetsView
    .currentInstitutionSetId
    ? getInstitutionSet(state)[
        state.fromView.institutionSetsView.currentInstitutionSetId
      ]
    : undefined;

  return currInstitutionSet
    ? createInstitutionSetView(
        currInstitutionSet,
        state.fromView.institutionSetsView.selectedReportIds,
        state.fromTags.byId,
        state.fromInstitutions.byId,
        state.fromSelectInstitutions.byId,
        state.fromView.institutionSelectView.selectedSearchStr,
        state.fromUsers.byId,
        currInstitutionSet.id
      )
    : undefined;
};

export const getAvailableInstitutions = (
  state: ApplicationState
): InstitutionView[] => {
  const stateCodes = state.fromView.institutionSelectView.stateCodes;
  const countyIds = state.fromView.institutionSelectView.countyIds;
  const currReport = getCurrentReport(state);
  const selInsts = currReport ? currReport.institutions : [];
  const typeIds = state.fromView.institutionSelectView.checkedTypeIds;

  if (
    (stateCodes.length > 0 || countyIds.length > 0) &&
    state.fromView.institutionSelectView.selectedStateHoldingCompanyTabId ===
      '1'
  ) {
    const insts = state.fromInstitutions.allIds
      .map(a => getInstitution(state)[a])
      .filter(
        f =>
          stateCodes.some(s => idExists(s, f.stateCodes)) ||
          countyIds.some(c => idExists(c, f.countyIds))
      )
      .reduce(
        (acc: InstitutionView[], inst) => [
          ...acc,
          ...inst.stateCodes.filter(s => stateCodes.includes(s)).map(st => ({
            ...inst,
            isReference: false,
            isSelected: state.fromView.institutionSelectView.selectedAvailableInstitutionIds.includes(
              inst.id
            ),
            id: `${inst.id}-${st}`,
            institutionId: inst.id,
            stateCode: st,
            asset: 0,
            market: 0,
          })),
          ...inst.countyIds.filter(c => countyIds.includes(c)).map(ct => ({
            ...inst,
            isReference: false,
            isSelected: state.fromView.institutionSelectView.selectedAvailableInstitutionIds.includes(
              inst.id
            ),
            countyName: getCounty(state)[ct].name,
            institutionId: inst.id,
            stateCode: getCounty(state)[ct].stateCode,
            asset: 0,
            market: 0,
          })),
        ],
        []
      )
      .filter(
        f =>
          selInsts.findIndex(
            s => `${s.institutionId}-${s.stateCode}` === f.id
          ) === -1 &&
          f.name
            .toLowerCase()
            .includes(
              state.fromView.institutionSelectView.availableSearchStr.toLowerCase()
            ) &&
          typeIds.includes(f.type)
      )
      .sort(
        (a, b) =>
          a.name.localeCompare(b.name) || a.stateCode.localeCompare(b.stateCode)
      );

    return insts;
  }

  if (state.fromView.institutionSelectView.selectedHoldingCompanyIds.length) {
    const hcs = state.fromView.institutionSelectView.selectedHoldingCompanyIds.map(
      x => state.fromHoldingCompanies.byId[x]
    );

    const instsHC = hcs.reduce(
      (acc: Institution[], hc) => [
        ...acc,
        ...hc.institutionIds.map(instId => state.fromInstitutions.byId[instId]),
      ],
      [] as Institution[]
    );

    return instsHC
      .reduce((acc: InstitutionView[], curr: Institution) => {
        const stInsts: InstitutionView[] = curr
          ? curr.stateCodes.map(st => ({
              ...curr,
              stateCode: st,
              isSelected: false,
              isReference: false,
              market: 0,
              institutionId: curr.id,
            }))
          : [];

        return [...acc, ...stInsts];
      }, [])
      .sort(
        (a, b) =>
          a.name.localeCompare(b.name) || a.stateCode.localeCompare(b.stateCode)
      );
  }

  return [];
};

export const getInstitutionSets = (state: ApplicationState) => {
  const currentUser = getCurrentUser(state);

  if (
    currentUser === undefined ||
    currentUser.institutionSetIds === undefined
  ) {
    return [];
  }

  return currentUser.institutionSetIds.map((
    iSet // console.dir(iSet),
  ) =>
    createInstitutionSetView(
      state.fromInstitutionSets.byId[iSet],
      state.fromView.institutionSetsView.selectedReportIds,
      state.fromTags.byId,
      state.fromInstitutions.byId,
      state.fromSelectInstitutions.byId,
      state.fromView.institutionSelectView.selectedSearchStr,
      state.fromUsers.byId,
      state.fromView.institutionSetsView.currentInstitutionSetId
    )
  );
};

export const getState = (
  state: ApplicationState,
  id: string,
  selectedCountyIds: ReadonlyArray<string>,
  expandedStateIds: ReadonlyArray<string>,
  selectedStateIds: ReadonlyArray<string>
): StateView => {
  const fndState = state.fromStates.byId[id];

  return {
    ...fndState,
    isExpanded: idExists(fndState.id, expandedStateIds),
    isSelected: idExists(fndState.id, selectedStateIds),
    counties: fndState.countyIds
      ? fndState.countyIds.map(c => ({
          ...getCounty(state)[c],
          isSelected: idExists(c.toString(), selectedCountyIds),
          stateName: fndState.name,
          stateIsSelected: false,
          nameSelection: {
            name: fndState.name,
            isSelected: false,
          },
        }))
      : [],
  };
};

export const getDefaultInstitutionSet = (
  state: ApplicationState
): InstitutionSetView | undefined => {
  const currUser = getCurrentUser(state);

  const fndInstitutionSet = currUser.institutionSetIds
    .map(i => getInstitutionSet(state)[i])
    .find(x => x.isDefault);

  return fndInstitutionSet
    ? createInstitutionSetView(
        fndInstitutionSet,
        state.fromView.institutionSetsView.selectedReportIds,
        state.fromTags.byId,
        state.fromInstitutions.byId,
        state.fromSelectInstitutions.byId,
        state.fromView.institutionSelectView.selectedSearchStr,
        state.fromUsers.byId,
        fndInstitutionSet.id
      )
    : undefined;
};

export const getDefaultReport = (
  state: ApplicationState
): Report | undefined => {
  const currUser = getCurrentUser(state);

  if (currUser === undefined) {
    return undefined;
  }
  // console.dir(currUser);
  const reports = currUser.reportIds
    .map(r => getReport(state)[r])
    .filter(x => (x ? x.isDefault : false));

  return reports.length > 0 ? reports[0] : undefined;
};

export const getFeature = (state: ApplicationState) => state.fromFeatures.byId;

export const getFeatures = (state: ApplicationState) =>
  state.fromFeatures.allIds.map(x => getFeature(state)[x]);

export const getHoldingCompany = (state: ApplicationState) =>
  state.fromHoldingCompanies.byId;

export const getHoldingCompanies = (
  state: ApplicationState
): HoldingCompanyView[] =>
  state.fromHoldingCompanies.allIds
    .map(x => ({
      ...getHoldingCompany(state)[x],
      isSelected: state.fromView.institutionSelectView.selectedHoldingCompanyIds.includes(
        x
      ),
    }))
    .slice(
      0,
      state.fromView.institutionSelectView
        .selectedHoldingCompanyTopCountTabId === '1'
        ? 10
        : 50
    )
    .sort((a, b) => a.name.localeCompare(b.name));

export const getInstitutionCriteria = (state: ApplicationState) =>
  state.fromView.institutionSelectView;

export const getProductOption = (state: ApplicationState) =>
  state.fromProductOptions.byId;

export const getProductOptions = (state: ApplicationState) =>
  state.fromProductOptions.allIds.map(x => getProductOption(state)[x]);

const getFeaturesByList = (
  includedIds: ReadonlyArray<string>,
  excludedIds: ReadonlyArray<string>,
  features: Feature[]
): Feature[] =>
  features.map(f => ({
    ...f,
    isChecked: idExists(f.id, includedIds)
      ? true
      : idExists(f.id, excludedIds)
        ? false
        : null,
  }));

const getAddProductCriterionView = (
  state: ApplicationState,
  productCriterion: ProductCriterion
): ProductCriterionView => ({
  ...productCriterion,
  features: getFeaturesByList(
    productCriterion.featureIncludedIds,
    productCriterion.featureExcludedIds,
    getFeatures(state)
  ),
  isSelected: false,
  selectedProductCategory: productCriterion.selectedProductCategoryId
    ? getProductOption(state)[productCriterion.selectedProductCategoryId]
    : undefined,
  selectedProductType: productCriterion.selectedProductTypeId
    ? getProductOption(state)[productCriterion.selectedProductTypeId]
    : undefined,
  selectedProductOwnership: productCriterion.selectedProductOwnershipId
    ? getProductOption(state)[productCriterion.selectedProductOwnershipId]
    : undefined,
  productCategories: productCriterion.productCategoryIds.map(
    m => getProductOption(state)[m]
  ),
  productTypes: productCriterion.productTypeIds.map(
    m => getProductOption(state)[m]
  ),
  productOwnerships: productCriterion.productOwnershipIds.map(
    m => getProductOption(state)[m]
  ),
});

export const getAddProductCriterion = (
  state: ApplicationState
): ProductCriterionView | undefined => {
  const pc = state.fromView.productAddView.productCriterionId
    ? state.fromProductCriteria.byId[
        state.fromView.productAddView.productCriterionId
      ]
    : undefined;

  return pc ? getAddProductCriterionView(state, pc) : undefined;
};

export const getAddTermRanges = (state: ApplicationState): RangeItem[] =>
  state.fromView.productAddView.rangeIds
    .map(t => state.fromRangeItems.byId[t])
    .filter(f => f.term)
    .sort(
      (a, b) =>
        (a.term && b.term && a.term - b.term) ||
        (a.minValue && b.minValue && a.minValue - b.minValue) ||
        (a.maxValue && b.maxValue && a.maxValue - b.maxValue) ||
        0
    );

export const getAddTierRanges = (state: ApplicationState): RangeItem[] =>
  state.fromView.productAddView.rangeIds
    .map(t => state.fromRangeItems.byId[t])
    .filter(f => !f.term);

export const getAddRanges = (state: ApplicationState): RangeItem[] =>
  state.fromView.productAddView.rangeIds.map(t => state.fromRangeItems.byId[t]);

export const getAddTermInput = (state: ApplicationState): RangeItem =>
  state.fromRangeItems.byId[state.fromView.productAddView.termRangeInputId];

export const getAddTierInput = (state: ApplicationState): RangeItem =>
  state.fromRangeItems.byId[state.fromView.productAddView.tierRangeInputId];

const getProductCriterionView = (
  state: ApplicationState,
  productCriterion: ProductCriterion,
  currentFav: Report | undefined
): ProductCriterionView => ({
  ...productCriterion,
  features: getFeaturesByList(
    productCriterion.featureIncludedIds,
    productCriterion.featureExcludedIds,
    getFeatures(state)
  ),
  isSelected: currentFav
    ? idExists(productCriterion.id, currentFav.selectedProductCriterionIds)
    : false,
  selectedProductCategory: productCriterion.selectedProductCategoryId
    ? getProductOption(state)[productCriterion.selectedProductCategoryId]
    : undefined,
  selectedProductType: productCriterion.selectedProductTypeId
    ? getProductOption(state)[productCriterion.selectedProductTypeId]
    : undefined,
  selectedProductOwnership: productCriterion.selectedProductOwnershipId
    ? getProductOption(state)[productCriterion.selectedProductOwnershipId]
    : undefined,
  productCategories: productCriterion.productCategoryIds.map(
    m => getProductOption(state)[m]
  ),
  productTypes: productCriterion.productTypeIds.map(
    m => getProductOption(state)[m]
  ),
  productOwnerships: productCriterion.productOwnershipIds.map(
    m => getProductOption(state)[m]
  ),
});

export const getMultiEditProductCriterion = (
  state: ApplicationState
): ProductCriterionView => {
  const multiEditId = 'multiEdit';
  const multiEditProductCriterion = state.fromProductCriteria.byId[multiEditId];
  const currentReport = getCurrentReport(state);
  const selectedProductCriteria = currentReport
    ? currentReport.selectedProductCriteria
    : [];

  const uniqueProductCategoryId = new Set(
    selectedProductCriteria.map(x => x.selectedProductCategoryId)
  );

  const uniqueProductTypeId = new Set(
    selectedProductCriteria.map(x => x.selectedProductTypeId)
  );

  const uniqueProductOwnershipId = new Set(
    selectedProductCriteria.map(x => x.selectedProductOwnershipId)
  );

  const uniqueProductTerm = new Set(
    selectedProductCriteria.map(x => x.selectedProductTerm)
  );

  const uniqueName = new Set(selectedProductCriteria.map(x => x.name));

  const uniqueTermMin = new Set(selectedProductCriteria.map(x => x.termMin));

  const uniqueTermMax = new Set(selectedProductCriteria.map(x => x.termMax));

  const uniqueTierMin = new Set(selectedProductCriteria.map(x => x.tierMin));

  const uniqueTierMax = new Set(selectedProductCriteria.map(x => x.tierMax));

  const selectedProductCategoryId =
    selectedProductCriteria[0] &&
    selectedProductCriteria[0].selectedProductCategoryId &&
    selectedProductCriteria[0].selectedProductCategoryId;

  const selectedProductTypeId =
    selectedProductCriteria[0] &&
    selectedProductCriteria[0].selectedProductTypeId &&
    selectedProductCriteria[0].selectedProductTypeId;

  const selectedProductOwnershipId =
    selectedProductCriteria[0] &&
    selectedProductCriteria[0].selectedProductOwnershipId &&
    selectedProductCriteria[0].selectedProductOwnershipId;

  return {
    ...multiEditProductCriterion,
    name: multiEditProductCriterion.name
      ? multiEditProductCriterion.name
      : uniqueName.size === 1
        ? selectedProductCriteria[0].name
        : undefined,
    features: [],
    isSelected: false,
    selectedProductCategoryId: multiEditProductCriterion.selectedProductCategoryId
      ? multiEditProductCriterion.selectedProductCategoryId
      : uniqueProductCategoryId.size === 1
        ? selectedProductCategoryId
        : undefined,
    selectedProductTypeId: multiEditProductCriterion.selectedProductTypeId
      ? multiEditProductCriterion.selectedProductTypeId
      : uniqueProductTypeId.size === 1
        ? selectedProductTypeId
        : undefined,
    selectedProductOwnershipId: multiEditProductCriterion.selectedProductOwnershipId
      ? multiEditProductCriterion.selectedProductOwnershipId
      : uniqueProductOwnershipId.size === 1
        ? selectedProductOwnershipId
        : undefined,
    selectedProductTerm: multiEditProductCriterion.selectedProductTerm
      ? multiEditProductCriterion.selectedProductTerm
      : uniqueProductTerm.size === 1
        ? selectedProductCriteria[0].selectedProductTerm
        : undefined,
    termMin: multiEditProductCriterion.termMin
      ? multiEditProductCriterion.termMin
      : uniqueTermMin.size === 1
        ? selectedProductCriteria[0].termMin
        : undefined,
    termMax: multiEditProductCriterion.termMax
      ? multiEditProductCriterion.termMax
      : uniqueTermMax.size === 1
        ? selectedProductCriteria[0].termMax
        : undefined,
    tierMin: multiEditProductCriterion.tierMin
      ? multiEditProductCriterion.tierMin
      : uniqueTierMin.size === 1
        ? selectedProductCriteria[0].tierMin
        : undefined,
    tierMax: multiEditProductCriterion.tierMax
      ? multiEditProductCriterion.tierMax
      : uniqueTierMax.size === 1
        ? selectedProductCriteria[0].tierMax
        : undefined,
    productCategories: [],
    productTypes: [],
    productOwnerships: [],
  };
};

export const getProductCriterion = (
  state: ApplicationState
): ProductCriterionView | undefined =>
  state.fromView.productCriteriaView.currentProductCriterionId
    ? state.fromView.productCriteriaView.currentProductCriterionId ===
      'multiEdit'
      ? getMultiEditProductCriterion(state)
      : getProductCriterionView(
          state,
          state.fromProductCriteria.byId[
            state.fromView.productCriteriaView.currentProductCriterionId
          ],
          getCurrentReport(state)
        )
    : undefined;

export const getCurrentProductCriterion = (state: ApplicationState) => {
  const currentReport = getCurrentReport(state);
  const currentProductCriterionId =
    currentReport && currentReport.typeId === 1
      ? currentReport.productCriterionId
      : state.fromView.productCriteriaView.currentProductCriterionId;
  const pc = currentProductCriterionId
    ? state.fromProductCriteria.byId[currentProductCriterionId]
    : undefined;

  return currentReport && pc
    ? getProductCriterionView(state, pc, getCurrentReport(state))
    : undefined;
};

export const getStates = (state: ApplicationState) =>
  state.fromStates.allIds.map(x =>
    getState(
      state,
      x,
      state.fromView.institutionSelectView.countyIds,
      state.fromView.institutionSelectView.expandedStateIds,
      state.fromView.institutionSelectView.stateCodes
    )
  );

export const getTags = (state: ApplicationState): TagView[] =>
  state.fromTags.allIds
    .map(x => ({
      ...getTagById(state)(x),
      isSelected: idExists(x, state.fromView.reportsView.selectedTagIds),
      allowSelect: true,
      allowDelete: false,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

export const getInstitutionType = (
  state: ApplicationState
): Record<string, InstitutionType> => state.fromInstitutionTypes.byId;

export const getInstitutionTypes = (
  state: ApplicationState
): InstitutionTypeView[] =>
  state.fromInstitutionTypes.allIds.map(i => ({
    ...getInstitutionType(state)[i],
    isChecked: idExists(i, state.fromView.institutionSelectView.checkedTypeIds),
  }));

export const filterInstitutions = (
  i: InstitutionView,
  selectedStateCodes: ReadonlyArray<string>
) =>
  selectedStateCodes.findIndex(
    x => i.stateCodes.filter(s => s === x).length > 0
  );

export const getProductCriteria = (
  state: ApplicationState
): ProductCriterionView[] | undefined => {
  const currentReport = getCurrentReport(state);

  return (
    currentReport &&
    currentReport.productCriterionIds
      .map(x => state.fromProductCriteria.byId[x])
      .filter(y => y && !y.isNew)
      .map(c => c && getProductCriterionView(state, c, currentReport))
      .sort((a, b) => a.sort - b.sort)
  );
};

export const getSelectedPreviewExtractorProducts = (
  state: ApplicationState
): ProductDemoView[] =>
  state.fromView.productPreviewView.selectedExtractorProductIds.reduce(
    (acc: ProductDemoView[], p: string) => {
      const product = sampleProducts.find(
        f => f.ProductID.toString() === p.toString()
      );

      return product ? [...acc, { ...product, isSelected: true }] : [...acc];
    },
    []
  );

export const getSelectedPreviewBuilderProducts = (
  state: ApplicationState
): ProductDemoView[] =>
  state.fromView.productPreviewView.selectedBuilderProductIds.reduce(
    (acc: ProductDemoView[], p: string) => {
      const product = sampleProducts.find(
        f => f.ProductID.toString() === p.toString()
      );

      return product ? [...acc, { ...product, isSelected: true }] : [...acc];
    },
    []
  );

export const getDefaultProductCriterion = (
  state: ApplicationState
): ProductCriterion | undefined => state.fromProductCriteria.byId[1];

export const getDefaultProductCriteria = (
  state: ApplicationState
): ProductCriterion[] | undefined =>
  ['2', '3', '4', '5', '6', '7', '8', '9'].map(
    p => state.fromProductCriteria.byId[p]
  );
