import { IconName } from '@fortawesome/fontawesome-svg-core';
import { GridApi } from 'ag-grid-community';
import { ReactNode } from 'react';
import { ReportActions } from 'src/store/modules/entities/reports/actions';

// #region Primary Definitions

export interface UIRoute {
  title: string;
  path: string;
  iconName: IconName;
  // tslint:disable-next-line:no-any
  component?: React.ComponentType<any>;
  parameters?: RouteParameter[];
  renderFunction?: () => ReactNode;
}

export interface RouteParameter {
  name: string;
  isOptional: boolean;
}

export interface ReportRouteParams {
  id: string;
  tabid?: string;
}

export interface InstitutionSet {
  id: string;
  name: string;
  description?: string;
  userid: string;
  isDefault: boolean;
  referenceSelectInstitutionId?: string;
  selectInstitutionIds: ReadonlyArray<string>;
  isShared: boolean;
  isDeleted: boolean;
  tagIds: ReadonlyArray<string>;
  modifiedById: string;
  modifiedDate: Date;
  createdById: string;
  createdDate: Date;
  lastRunDate?: Date;
}

export interface InstitutionSetView extends InstitutionSet {
  isCurrent: boolean;
  isSelected: boolean;
  institutions: InstitutionView[];
  onClick?: typeof ReportActions.selectReport;
  tags: TagView[];
  user: User;
}

export interface Report extends InstitutionSet {
  productCriterionId: string;
  productCriterionIds: ReadonlyArray<string>;
  selectedProductCriterionIds: ReadonlyArray<string>;
  typeId: number;
  compareTypeId: number;
  compareDate?: Date;
  viewType: number;
}

export interface ReportView extends Report {
  isCurrent: boolean;
  isSelected: boolean;
  institutions: InstitutionView[];
  onClick?: typeof ReportActions.selectReport;
  productCriterion: ProductCriterion;
  productCriteria: ProductCriterion[];
  selectedProductCriteria: ProductCriterion[];
  tags: TagView[];
  user: User;
}

export interface InstitutionStateMarket {
  id: string;
  institutionId: string;
  stateCode: string;
  marketShare: number;
}

export interface Institution {
  id: string;
  name: string;
  type: string;
  hc_id: number;
  asset: number;
  stateMarketIds?: string[];
  stateCodes: string[];
  countyIds: string[];
}

export interface InstitutionView extends Institution {
  isReference: boolean;
  isSelected: boolean;
  institutionId: string;
  stateCode: string;
  countyName?: string;
  market: number;
}

export interface State {
  id: string;
  name: string;
  stateCode: string;
  countyIds: string[];
}

export interface StateView extends State {
  isSelected: boolean;
  isExpanded: boolean;
  counties: CountyView[];
}

export interface County {
  id: string;
  name: string;
  stateCode: string;
}

export interface CountyView extends County {
  isSelected: boolean;
  stateName: string;
  stateIsSelected: boolean;
  nameSelection: NameSelection;
}

export interface NameSelection {
  name: string;
  isSelected: boolean;
}

export interface Feature {
  id: string;
  name: string;
  isChecked: boolean | null;
  sort: number;
}

export interface InstitutionType {
  id: string;
  name: string;
  sort: number;
}

export interface InstitutionTypeView extends InstitutionType {
  isChecked: boolean;
}

export interface HoldingCompany {
  id: number;
  name: string;
  rank: number;
  institutionIds: number[];
}

export interface HoldingCompanyView extends HoldingCompany {
  isSelected: boolean;
}

export interface SortAttribute {
  id: string;
  field: string;
  isAscending?: boolean;
}

export interface RangeItem {
  id: string;
  name?: string;
  term?: ProductTerm;
  minValue?: number;
  maxValue?: number;
}

export interface Product {
  id: number;
  BA_ID?: number;
  PD_ID?: number;
  Ownership?: string;
  Category?: string;
  PD_OWNERSHIP?: string;
  PD_CATEGORY?: string;
  PD_CD_IRA?: string;
  PD_PRODNAME?: string;
  PD_MINTERM?: number;
  PD_MAXTERM?: number;
  PD_MINTIER?: number;
  PD_MAXTIER?: number;
  PD_DISPLAY_NAME?: string;
  PR_RATE?: number;
  PR_APY?: number;
  PR_DATETIME?: string;
  PD_PARENT?: string;
  PD_PRODCODE?: string;
  PD_ACCOUNTNO?: string;
  PD_ADDON?: boolean;
  PD_AFFINITY_GRP?: boolean;
  PD_AUTOTRANSFER?: boolean;
  PD_BILL_PAY_REQ?: boolean;
  PD_BONUS_RATE?: boolean;
  PD_BONUS_TERM?: boolean;
  PD_BUMPRATE?: boolean;
  PD_CALLABLE?: boolean;
  PD_CHILD_OF?: boolean;
  PD_CLUBACCT?: boolean;
  PD_COMP_DAYS?: number;
  PD_COMP_METHOD?: number;
  PD_CORE?: boolean;
  PD_COUPON_REQUIRED?: boolean;
  PD_CREATED_BY?: number;
  PD_CREATED_DATE?: string;
  PD_DATABASE?: string;
  PD_DEBIT_CARD_REQ?: boolean;
  PD_DIRECT_DEPOSIT?: boolean;
  PD_ESCROW?: boolean;
  PD_ESTMNT_REQ?: boolean;
  PD_GIFTS?: boolean;
  PD_GRANDFATHERED?: boolean;
  PD_HOA?: boolean;
  PD_HSA?: boolean;
  PD_HYBRID_CHECKING?: boolean;
  PD_INDEX_CODE?: string;
  PD_INDEXED_RATE?: boolean;
  PD_INSSWEEP?: boolean;
  PD_INTERNETONLY?: boolean;
  PD_IOLTA?: boolean;
  PD_IOREBTA?: boolean;
  PD_LINKED_PRODUCT?: boolean;
  PD_LIQUID?: boolean;
  PD_LTD_LOCATION?: boolean;
  PD_MAXTERM_DURATION?: number;
  PD_MAXTERM_UNITS?: number;
  PD_MIN_BAL_OPEN?: number;
  PD_MINOR_YOUTH?: boolean;
  PD_MINTERM_DURATION?: number;
  PD_MINTERM_UNITS?: number;
  PD_NEW_MONEY_REQUIRED?: boolean;
  PD_NO_BILL_PAY?: boolean;
  PD_NO_BUMPS?: boolean;
  PD_NO_DEBIT_TRANS?: boolean;
  PD_NO_NP?: boolean;
  PD_NO_PENALTY?: boolean;
  PD_NON_PROFIT?: boolean;
  PD_NOTES?: string;
  PD_NUMBCHECK?: string;
  PD_Promo?: boolean;
  PD_PROMO_END_DATE?: string;
  PD_PROMO_EXPIRATION_DATE?: string;
  PD_PROMO_LAST_ADV_DATE?: string;
  PD_PROMO_LAST_CHANGE_DATE?: string;
  PD_PROMO_START_DATE?: string;
  PD_PROMO_STATUS?: string;
  PD_PUBLICFUND?: boolean;
  PD_PVT_BANK?: boolean;
  PD_RELATION?: boolean;
  PD_RETENTION?: boolean;
  PD_ROWID?: number;
  PD_SB_COM?: boolean;
  PD_SENIOR?: boolean;
  PD_STATEPASS?: string;
  PD_STEPPED_RATE?: boolean;
  PD_STUDENT?: boolean;
  PD_TEASER_INTRO?: boolean;
  PD_VARIABLE?: boolean;
}

export interface ProductView extends Product {
  isSelected: boolean;
  PromoImageURL: string;
  stateCode: string;
  institutionName: string;
}

export interface ProductDemo {
  id: number;
  Change: number;
  TotalCount: number;
  UserProductID: number;
  UserProductName: string;
  FirmName: string;
  Name: string;
  ProprietaryName: string;
  Promo: string;
  AdLink: string;
  ProductCode: string;
  ProductNotes: string;
  ProductType: string;
  AccountNumber: number;
  CD_IRA: string;
  Region: string;
  Core: string;
  Relationship: string;
  NewMoneyRequired: string;
  IntroRate: string;
  InternetOnly: string;
  LinkedProduct: number;
  ProductID: number;
  BankID: number;
  BankName: string;
  Category: string;
  Ownership: string;
  StateCode: string;
  MinTerm: number;
  MaxTerm: number;
  MinTier: number;
  MaxTier: number;
  Rate: number;
  APY: number;
}

export interface ProductDemoView extends ProductDemo {
  isSelected: boolean;
}

export interface ProductCriterion {
  id: string;
  name?: string;
  description?: string;
  isSingleSelection: boolean;
  typeId: number;
  productCategoryIds: string[];
  productTypeIds: string[];
  productOwnershipIds: string[];
  termMin?: number;
  termMax?: number;
  tierMin?: number;
  tierMax?: number;
  featureIncludedIds: string[];
  featureExcludedIds: string[];
  isNew?: boolean;
  sort: number;

  selectedProductCategoryId?: string;
  selectedProductTypeId?: string;
  selectedProductOwnershipId?: string;
  selectedProductTerm?: ProductTerm;
}

export interface ProductCriterionView extends ProductCriterion {
  features: Feature[];
  isSelected: boolean;
  selectedProductCategory?: ProductOption;
  selectedProductType?: ProductOption;
  selectedProductOwnership?: ProductOption;
  productCategories: ProductOption[];
  productTypes: ProductOption[];
  productOwnerships: ProductOption[];
}

export enum ProductTerm {
  Days = 1,
  Months = 2,
  Years = 3,
}

export interface ProductOption {
  id: string;
  name: string;
  isChecked: boolean;
  sort: number;
}

export interface Tag {
  id: string;
  name: string;
}

export interface TagView extends Tag {
  isSelected: boolean;
  allowDelete: boolean;
  allowSelect: boolean;
}

export interface User {
  id: string;
  name: string;
  lastLogin?: Date;
  reportIds: ReadonlyArray<string>;
  institutionSetIds: ReadonlyArray<string>;
  imageUrl?: string;
  // productCriterionIds: ReadonlyArray<string>;
}

export interface UserView {
  productCriterion: ProductCriterion[];
}

// #endregion

// #region Entity States

export interface InstitutionsState {
  byId: Readonly<Record<string, Institution>>;
  allIds: ReadonlyArray<string>;
}

export interface CountiesState {
  byId: Readonly<Record<string, County>>;
  allIds: ReadonlyArray<string>;
}

export interface ProductCriterionState {
  byId: Readonly<Record<string, ProductCriterion>>;
  allIds: string[];
}

export interface ProductOptionState {
  byId: Readonly<Record<string, ProductOption>>;
  allIds: string[];
}

export interface RangeItemsState {
  byId: Readonly<Record<string, RangeItem>>;
  allIds: ReadonlyArray<string>;
}

export interface SelectInstitutionState {
  byId: Readonly<Record<string, InstitutionStateMarket>>;
  allIds: ReadonlyArray<string>;
}

export interface FeatureState {
  byId: Readonly<Record<string, Feature>>;
  allIds: string[];
}

export interface ReportsState {
  byId: Readonly<Record<string, Report>>;
  allIds: ReadonlyArray<string>;
}

export interface HoldingCompaniesState {
  byId: Readonly<Record<string, HoldingCompany>>;
  allIds: ReadonlyArray<string>;
}

export interface InstitutionSetsState {
  byId: Readonly<Record<string, InstitutionSet>>;
  allIds: ReadonlyArray<string>;
}

export interface InstitutionTypesState {
  byId: Readonly<Record<string, InstitutionType>>;
  allIds: ReadonlyArray<string>;
}

export interface StatesState {
  byId: Readonly<Record<string, State>>;
  allIds: ReadonlyArray<string>;
}

export interface TagState {
  byId: Readonly<Record<string, Tag>>;
  allIds: ReadonlyArray<string>;
}

export interface UsersState {
  byId: Readonly<Record<string, User>>;
  allIds: ReadonlyArray<string>;
}
// #endregion

// #region Redux Types

export interface ProductPreviewViewState {
  gridApi?: GridApi;
  selectedExtractorProductIds: ReadonlyArray<string>;
  selectedBuilderProductIds: ReadonlyArray<string>;
  showReportSummary: boolean;
  showChart: boolean;
  showChartTab: boolean;
  showSaveDialog: boolean;
  saveName: string;
  saveDescription?: string;
}

export interface ProductViewState {
  selectedProductTabId: string;
}

export interface ProductCriteriaViewState {
  currentProductCriterionId?: string;
  selectedProductCriterionIds: ReadonlyArray<string>;
  showProductCriteriaList: boolean;
  newProductCriterionId?: string;
}

export interface ProductAddViewState {
  productCriterionId?: string;
  rangeIds: ReadonlyArray<string>;
  termRangeInputId: string;
  tierRangeInputId: string;
}

export interface ReportCriteriaViewState {
  selectedReportTabId: string;
}

export interface InstitutionSetsViewState {
  currentInstitutionSetId?: string;
  currentUserId: string;
  newTagName: string;
  institutionSetDetailId?: string;
  selectedLoadInstitutionSetId?: string;
  selectedReportIds: ReadonlyArray<string>;
  selectedTagIds: ReadonlyArray<string>;
  showReportCriteriaPage: boolean;
  myReportsIsCollapsed: boolean;
  sharedIsCollapsed: boolean;
  deletedIsCollapsed: boolean;
}

export enum SortBy {
  'name',
  'modified',
  'last run'
}

export interface ReportsViewState {
  currentReportId?: string;
  currentUserId: string;
  newTagName: string;
  reportDetailId?: string;
  searchTxt: string;
  sortType: SortBy;
  selectedReportIds: ReadonlyArray<string>;
  selectedTagIds: ReadonlyArray<string>;
  showReportCriteriaPage: boolean;
  myReportsIsCollapsed: boolean;
  sharedIsCollapsed: boolean;
  deletedIsCollapsed: boolean;
}

export interface InstitutionSelectViewState {
  stateCodes: ReadonlyArray<string>;
  countyIds: ReadonlyArray<string>;
  expandedStateIds: ReadonlyArray<string>;
  availableSearchStr: string;
  selectedSearchStr: string;
  checkedTypeIds: ReadonlyArray<string>;
  assetRanges: RangeItem[];
  availableSorts: SortAttribute[];
  selectedSorts: SortAttribute[];
  selectedLoadInstitutionSetId?: string;
  showMap: boolean;
  showNewInstitutionListDialog: boolean;
  selectedStateHoldingCompanyTabId: string;
  selectedHoldingCompanyTopCountTabId: string;
  selectedHoldingCompanyIds: ReadonlyArray<string>;
  selectedAvailableInstitutionIds: ReadonlyArray<string>;
  selectedInstitutionIds: ReadonlyArray<string>;
  filterEntity: 'Available' | 'Selected';
}

export interface ViewState {
  reportsView: ReportsViewState;
  institutionSetsView: InstitutionSetsViewState;
  institutionSelectView: InstitutionSelectViewState;
  productAddView: ProductAddViewState;
  productCriteriaView: ProductCriteriaViewState;
  productView: ProductViewState;
  productPreviewView: ProductPreviewViewState;
  reportCriteriaView: ReportCriteriaViewState;
}

export enum ActionKeys {
  COUNTIES_RECEIVE = '[counties] Receive',
  COUNTIES_SELECT_ALL = '[counties] Select All',
  COUNTIES_SELECT_NONE = '[counties] Select None',
  COUNTIES_TOGGLE_SELECTION = '[counties] Toggle selection',
  REPORT_ADD_TAG = '[report] Add Tag',
  REPORT_REMOVE_TAG = '[report] Remove Tag',
  REPORT_SELECT = '[report] Select',
  REPORTS_ERROR = '[reports] Error',
  REPORTS_RECEIVE = '[reports] Receive',
  REPORTS_REQUEST = '[reports] Request',
  FEATURES_ERROR = '[features] Error',
  FEATURES_RECEIVE = '[features] Receive',
  FEATURES_REQUEST = '[features] Request',
  FEATURES_TOGGLE_CHECKED = '[features] Toggle checked',
  HOLDING_COMPANIES_RECEIVE = '[holdingCompanies] Receive',
  INSTITUTION_LIST_SET_REFERENCE = '[institutionList] Set reference',
  INSTITUTION_SELECT_VIEW_TOGGLE_INSTITUTIONTYPE = '[institutionSelectView] Toggle institution type',
  // tslint:disable-next-line:max-line-length
  INSTITUTION_SELECT_VIEW_TOGGLE_AVAILABLE_INSTITUTION_SELECTION = '[institutionSelectView] Toggle available institution selection',
  INSTITUTION_SELECT_VIEW_TOGGLE_INSTITUTION_SELECTION = '[institutionSelectView] Toggle institution selection',
  // tslint:disable-next-line:max-line-length
  INSTITUTION_SELECT_VIEW_TOGGLE_NEW_INSTITUTION_SET_DIALOG = '[institutionSelectView] Toggle new institution set dialog',
  INSTITUTION_SELECT_VIEW_SET_STATES_SELECTED = '[institutionSelectView] Set states selected',
  INSTITUTION_SELECT_VIEW_RESET_FILTER = '[institutionSelectView] Reset filter',
  INSTITUTION_SELECT_VIEW_UPDATE_SEARCH_TEXT = '[institutionSelectView] Update search text',
  INSTITUTION_SELECT_VIEW_TOGGLE_MAP = '[institutionSelectView] Toggle map',
  INSTITUTION_SELECT_VIEW_SET_STATE_HOLDINGCOMPANY_TAB = '[institutionSelectView] Set state/holding company tab',
  INSTITUTION_SELECT_VIEW_TOGGLE_HOLDING_COMPANY_SELECTION = '[institutionSelectView] Toggle holding company selection',
  INSTITUTION_SELECT_VIEW_SET_HOLDING_COMPANY_COUNT_TAB = '[institutionSelectView] Set holding company count tab',
  INSTITUTION_SELECT_VIEW_SET_SELECTED_LOAD_ID = '[institutionSelectView] Set selected load id',
  INSTITUTION_SET_ADD_TAG = '[institutionSet] Add Tag',
  INSTITUTION_SET_REMOVE_TAG = '[institutionSet] Remove Tag',
  INSTITUTION_SET_RECEIVE = '[institutionSet] Receive',
  INSTITUTION_SET_SET_CURRENT_DETAIL = '[institutionSet] Set current detail institution set',
  INSTITUTION_SET_ADD = '[institutionSet] Add',
  INSTITUTION_SET_UPDATE = '[institutionSet] Update',
  INSTITUTION_SET_VIEW_SET_CURRENT_ID = '[institutionsSetsView] Set current id',
  INSTITUTIONS_ERROR = '[institutions] Error',
  INSTITUTIONS_RECEIVE = '[institutions] Receive',
  INSTITUTIONS_REQUEST = '[institutions] Request',
  INSTITUTION_TYPES_RECEIVE = '[institutionTypes] Receive',
  PRODUCT_ADD_VIEW_ADD_TERM_RANGE = '[productAddView] Add term range',
  PRODUCT_ADD_VIEW_RESET_RANGE = '[productAddView] Reset range',
  PRODUCT_CRITERIA_VIEW_SET_CURRENT_PRODUCT_CRITERION = '[productCriteriaView] Set current product criterion',
  PRODUCT_CRITERIA_VIEW_UNSET_CURRENT_PRODUCT_CRITERION = '[productCriteriaView] Unset current product criterion',
  PRODUCT_CRITERIA_VIEW_TOGGLE_SELECTION = '[productCriteriaView] Product criterion toggle selection',
  PRODUCT_PREVIEW_VIEW_TOGGLE_EXTRACTOR_SELECTION = '[productPreviewView] Toggle product selection extractor',
  PRODUCT_PREVIEW_VIEW_TOGGLE_BUILDER_SELECTION = '[productPreviewView] Toggle product selection builder',
  PRODUCT_PREVIEW_VIEW_TOGGLE_SUMMARY = '[productPreviewView] Toggle summary',
  PRODUCT_PREVIEW_VIEW_SET_GRID_API = '[productPreviewView] Set grid api',
  PRODUCT_PREVIEW_VIEW_TOGGLE_CHART = '[productPreviewView] Toggle chart',
  PRODUCT_PREVIEW_VIEW_TOGGLE_SAVE_DIALOG = '[productPreviewView] Toggle save dialog',
  PRODUCT_PREVIEW_VIEW_UPDATE_NAME_SAVE_DIALOG = '[productPreviewView] update name save dialog',
  PRODUCT_PREVIEW_VIEW_UPDATE_DESCRIPTION_SAVE_DIALOG = '[productPreviewView] update description save dialog',
  UI_UNSET_PRODUCT_CRITERION = '[ui] Unset product criterion',
  PRODUCT_CRITERIA_ERROR = '[productCriteria] Error',
  PRODUCT_CRITERIA_RECEIVE = '[productCriteria] Receive',
  PRODUCT_CRITERIA_REQUEST = '[productCriteria] Request',
  PRODUCT_CRITERIA_UPDATE = '[productCriteria] Update',
  PRODUCT_CRITERIA_ADD = '[productCriteria] Add',
  PRODUCT_CRITERIA_DELETE = '[productCriteria] Delete',
  PRODUCT_CRITERIA_FEATURES_CLEAR_ALL = '[productCriteria] Clear All Features ',
  PRODUCT_OPTIONS_ERROR = '[productOptions] Error',
  PRODUCT_OPTIONS_RECEIVE = '[productOptions] Receive',
  PRODUCT_OPTIONS_REQUEST = '[productOptions] Request',
  PRODUCT_OPTIONS_TOGGLE = '[productOptions] Toggle',
  PRODUCTS_ERROR = '[products] Error',
  PRODUCTS_RECEIVE = '[products] Receive',
  PRODUCTS_REQUEST = '[products] Request',
  PRODUCTS_TOGGLE = '[products] Toggle',
  RANGE_ITEMS_ADD = '[rangeItems] Add',
  RANGE_ITEMS_DELETE = '[rangeItems] Delete',
  RANGE_ITEMS_UPDATE = '[rangeItems] Update',
  RANGE_ITEMS_RECEIVE = '[rangeItems] Receive',
  RANGE_ITEMS_RESET = '[rangeItems] Reset',
  REPORT_CRITERIA_PAGE_TOGGLE = '[reportPage] Toggle',
  REPORT_CRITERIA_RESET = '[reportPage] Product Criteria Reset',
  REPORT_CRITERIA_DELETE_ALL = '[reportPage] Product Criteria Delete All',
  REPORT_ADD = '[report] Add',
  REPORT_SET_CURRENT_DETAIL = '[report] Set current detail report',
  REPORT_UPDATE = '[report] Update',
  REPORT_SET_REPORT_TYPE = '[report] Set report type',
  REPORT_SET_COMPARE_TYPE_DATE = '[report] Set report compare type and date',
  REPORTS_VIEW_SET_CURRENT_REPORT_ID = '[reportsView] Set current report id',
  REPORTS_VIEW_TOGGLE_LISTS = '[reportsView] Toggle lists',
  REPORTS_VIEW_UPDATE_SEARCH_TEXT = '[reportsView] Update search text',
  REPORTS_VIEW_UPDATE_SORT_BY = '[reportsView] Update sort by',
  SELECT_INSTITUTION_ADD_TO_REPORT = '[selectInstitution] Add to report',
  SELECT_INSTITUTION_ADD_TO_INSTITUTIONSET = '[selectInstitution] Add to institution set',
  SELECT_INSTITUTION_DELETE_FROM_REPORT = '[selectInstitution] Delete from report',
  SELECT_INSTITUTION_DELETE_FROM_INSTITUTIONSET = '[selectInstitution] Delete from institution set',
  SELECT_INSTITUTION_DELETE_ALL_FROM_REPORT = '[selectInstitution] Delete all from report',
  SELECT_INSTITUTION_DELETE_ALL_FROM_INSTITUTIONSET = '[selectInstitution] Delete all from institution set',
  STATES_TOGGLE_EXPANSION = '[states] Toggle county expansion',
  STATES_RECEIVE = '[states] Receive',
  STATES_SELECT_ALL = '[states] Select All',
  STATES_SELECT_NONE = '[states] Select None',
  STATES_TOGGLE_SELECTION = '[states] Toggle selection',
  TAG_NAME_SET = '[tagname] Set',
  TAGS_ADD = '[tags] Add',
  TAGS_ERROR = '[tags] Error',
  TAGS_RECEIVE = '[tags] Receive',
  TAGS_REQUEST = '[tags] Request',
  TAGS_REMOVE = '[tags] Remove',
  TAGS_TOGGLE = '[tags] Toggle',
  UI_PRODUCT_CRITERIA_LIST_TOGGLE = '[ui] Product criteria list toggle',
  REPORT_CRITERIA_VIEW_SET_TAB = '[reportCriteriaView] Set tab',
  PRODUCT_CRITERIA_VIEW_SET_TAB = '[productCriteriaView] Set tab',
  USERS_RECEIVE = '[users] Receive',
}

export type Action =
  | AddReportTagAction
  | AddInstitutionSetTagAction
  | AddProductCriterionAction
  | AddRangeItemsAction
  | AddReportAction
  | AddInstitutionSetAction
  | AddSelectInstitutionToReportAction
  | AddSelectInstitutionToInstitutionSetAction
  | AddTagAction
  | ClearAllFeaturesProductCriteriaAction
  | DeselectAllCountiesAction
  | DeselectAllStatesAction
  | DeleteAllSelectInstitutionsFromReportAction
  | DeleteAllSelectInstitutionsFromInstitutionSetAction
  | DeleteRangeItemsAction
  | DeleteProductCriterionAction
  | DeleteAllReportCriteriaAction
  | DeleteSelectInstitutionFromReportAction
  | DeleteSelectInstitutionFromInstitutionSetAction
  | ErrorReportsAction
  | ErrorFeaturesAction
  | ErrorInstitutionsAction
  | ErrorProductCriteriaAction
  | ErrorProductOptionsAction
  | ErrorProductsAction
  | ErrorTagAction
  | ReceiveCountiesAction
  | ReceiveReportsAction
  | ReceiveFeaturesAction
  | ReceiveInstitutionsAction
  | ReceiveInstitutionSetAction
  | ReceiveInstitutionTypesAction
  | ReceiveHoldingCompaniesAction
  | ReceiveProductCriteriaAction
  | ReceiveProductOptionsAction
  | ReceiveProductsAction
  | ReceiveRangeItemsAction
  | ReceiveStatesAction
  | ReceiveTagAction
  | ReceiveUsersAction
  | RemoveInstitutionSetTagAction
  | RemoveReportTagAction
  | RemoveTagAction
  | ResetFilterAction
  | ResetRangeItemAction
  | ResetRangeItemListAction
  | ResetReportCriteriaAction
  | RequestReportsAction
  | RequestFeaturesAction
  | RequestInstitutionsAction
  | RequestProductCriteriaAction
  | RequestProductOptionsAction
  | RequestProductsAction
  | RequestTagAction
  | SelectAllCountiesAction
  | SelectAllStatesAction
  | SelectReportAction
  | SetHoldingCompanyCountTabAction
  | SetProductCriteriaTab
  | SetReportCriteriaTab
  | SetStateHoldingCompanyTab
  | SetTagNameAction
  | SetCurrentProductCriterionAction
  | SetCurrentReportIdAction
  | SetCurrentInstitutionSetIdAction
  | SetPreviewGridAPIAction
  | SetInstitutionSetDetailAction
  | SetReferenceInstitutionListAction
  | SetReportTypeAction
  | SetReportDetailAction
  | SetReportCompareTypeDate
  | SetStatesSelectedAction
  | SetSelectedLoadIdAction
  | ToggleAvailableInstitutionSelection
  | ToggleProductChartAction
  | ToggleProductCriterionSelectionAction
  | ToggleCountySelectionAction
  | ToggleFeatureCheckAction
  | ToggleInstitutionSelectionAction
  | ToggleInstitutionTypeAction
  | ToggleMapAction
  | ToggleNewInstitutionSetDialogAction
  | ToggleProductOptionsAction
  | ToggleReportCriteriaPageAction
  | ToggleReportSummaryAction
  | ToggleListReportsViewAction
  | TogglePreviewSaveDialogAction
  | ToggleStateExpansionAction
  | ToggleStateSelectionAction
  | ToggleTagSelectionAction
  | ToggleProductSelectionExtractorAction
  | ToggleProductSelectionBuilderAction
  | ToggleProductCriteriaList
  | ToggleHoldingCompanySelection
  | UpdateProductCriteriaAction
  | UpdateRangeItemsAction
  | UpdateReportAction
  | UpdateInstitutionSetAction
  | UpdateInstitutionSearchTextAction
  | UpdatePreviewNameSaveDialogAction
  | UpdatePreviewDescriptionSaveDialogAction
  | UpdateReportsViewSearchTextAction
  | UpdateReportsViewSortByAction
  | UnsetUIProductCriterionAction;

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

interface AddInstitutionSetAction {
  type: ActionKeys.INSTITUTION_SET_ADD;
  institutionSet: InstitutionSet;
}

interface AddReportAction {
  type: ActionKeys.REPORT_ADD;
  newReport: Report;
}

interface UpdateInstitutionSetAction {
  type: ActionKeys.INSTITUTION_SET_UPDATE;
  institutionSet: InstitutionSet;
}

interface UpdateReportAction {
  type: ActionKeys.REPORT_UPDATE;
  report: Report;
}

interface AddSelectInstitutionToInstitutionSetAction {
  type: ActionKeys.SELECT_INSTITUTION_ADD_TO_INSTITUTIONSET;
  id: string;
  selectInstitution: InstitutionStateMarket;
}

interface AddSelectInstitutionToReportAction {
  type: ActionKeys.SELECT_INSTITUTION_ADD_TO_REPORT;
  reportId: string;
  selectInstitution: InstitutionStateMarket;
}

interface ClearAllFeaturesProductCriteriaAction {
  type: ActionKeys.PRODUCT_CRITERIA_FEATURES_CLEAR_ALL;
  id: string;
}

interface DeleteRangeItemsAction {
  type: ActionKeys.RANGE_ITEMS_DELETE;
  id: string;
}

interface AddTagAction {
  type: ActionKeys.TAGS_ADD;
  tag: Tag;
}

interface RequestInstitutionsAction {
  type: ActionKeys.INSTITUTIONS_REQUEST;
}

interface ReceiveInstitutionsAction {
  type: ActionKeys.INSTITUTIONS_RECEIVE;
  institutions: Institution[];
}

interface ReceiveInstitutionTypesAction {
  type: ActionKeys.INSTITUTION_TYPES_RECEIVE;
  institutionTypes: InstitutionType[];
}

interface DeleteAllSelectInstitutionsFromReportAction {
  type: ActionKeys.SELECT_INSTITUTION_DELETE_ALL_FROM_REPORT;
  id: string;
}

interface DeleteAllSelectInstitutionsFromInstitutionSetAction {
  type: ActionKeys.SELECT_INSTITUTION_DELETE_ALL_FROM_INSTITUTIONSET;
  id: string;
}

interface DeleteSelectInstitutionFromReportAction {
  type: ActionKeys.SELECT_INSTITUTION_DELETE_FROM_REPORT;
  id: string;
  reportId: string;
}

interface DeleteSelectInstitutionFromInstitutionSetAction {
  type: ActionKeys.SELECT_INSTITUTION_DELETE_FROM_INSTITUTIONSET;
  id: string;
  institutionSetId: string;
}

interface ErrorInstitutionsAction {
  type: ActionKeys.INSTITUTIONS_ERROR;
  error: string;
}

interface DeselectAllCountiesAction {
  type: ActionKeys.COUNTIES_SELECT_NONE;
}

interface DeselectAllStatesAction {
  type: ActionKeys.STATES_SELECT_NONE;
}

interface RequestReportsAction {
  type: ActionKeys.REPORTS_REQUEST;
}

interface ReceiveReportsAction {
  type: ActionKeys.REPORTS_RECEIVE;
  reports: Report[];
}

interface ReceiveHoldingCompaniesAction {
  type: ActionKeys.HOLDING_COMPANIES_RECEIVE;
  holdingCompanies: HoldingCompany[];
}

interface ReceiveInstitutionSetAction {
  type: ActionKeys.INSTITUTION_SET_RECEIVE;
  institutionSets: InstitutionSet[];
}

interface ErrorReportsAction {
  type: ActionKeys.REPORTS_ERROR;
  error: string;
}

interface RequestProductsAction {
  type: ActionKeys.PRODUCTS_REQUEST;
}

interface ReceiveProductsAction {
  type: ActionKeys.PRODUCTS_RECEIVE;
  products: Product[];
}

interface ReceiveRangeItemsAction {
  type: ActionKeys.RANGE_ITEMS_RECEIVE;
  rangeItems: RangeItem[];
}

interface ErrorProductsAction {
  type: ActionKeys.PRODUCTS_ERROR;
  error: string;
}

interface RequestFeaturesAction {
  type: ActionKeys.FEATURES_REQUEST;
}

interface ReceiveFeaturesAction {
  type: ActionKeys.FEATURES_RECEIVE;
  features: Feature[];
}

interface ErrorFeaturesAction {
  type: ActionKeys.FEATURES_ERROR;
  error: string;
}

interface ToggleFeatureCheckAction {
  type: ActionKeys.FEATURES_TOGGLE_CHECKED;
  id: string;
  productCriterionId: string;
}

interface TogglePreviewSaveDialogAction {
  type: ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_SAVE_DIALOG;
}

interface ToggleListReportsViewAction {
  type: ActionKeys.REPORTS_VIEW_TOGGLE_LISTS;
  id: 'myReports' | 'shared' | 'deleted';
}

interface UpdatePreviewNameSaveDialogAction {
  type: ActionKeys.PRODUCT_PREVIEW_VIEW_UPDATE_NAME_SAVE_DIALOG;
  name: string;
}

interface UpdatePreviewDescriptionSaveDialogAction {
  type: ActionKeys.PRODUCT_PREVIEW_VIEW_UPDATE_DESCRIPTION_SAVE_DIALOG;
  description: string;
}

interface UpdateReportsViewSearchTextAction {
  type: ActionKeys.REPORTS_VIEW_UPDATE_SEARCH_TEXT;
  searchTxt: string;
}

interface UpdateReportsViewSortByAction {
  type: ActionKeys.REPORTS_VIEW_UPDATE_SORT_BY;
  sortType: SortBy;
}

interface RequestProductCriteriaAction {
  type: ActionKeys.PRODUCT_CRITERIA_REQUEST;
}

interface ReceiveProductCriteriaAction {
  type: ActionKeys.PRODUCT_CRITERIA_RECEIVE;
  productCriteria: ProductCriterion[];
}

interface ReceiveCountiesAction {
  type: ActionKeys.COUNTIES_RECEIVE;
  counties: County[];
}

interface ReceiveStatesAction {
  type: ActionKeys.STATES_RECEIVE;
  states: State[];
}

interface ReceiveUsersAction {
  type: ActionKeys.USERS_RECEIVE;
  users: User[];
}

interface ErrorProductCriteriaAction {
  type: ActionKeys.PRODUCT_CRITERIA_ERROR;
  error: string;
}

interface UpdateProductCriteriaAction {
  type: ActionKeys.PRODUCT_CRITERIA_UPDATE;
  productCriterion: ProductCriterion;
}

interface AddProductCriterionAction {
  type: ActionKeys.PRODUCT_CRITERIA_ADD;
  newProductCriterion: ProductCriterion;
  reportId: string;
}

interface ResetFilterAction {
  type: ActionKeys.INSTITUTION_SELECT_VIEW_RESET_FILTER;
}

interface ResetReportCriteriaAction {
  type: ActionKeys.REPORT_CRITERIA_RESET;
  report: Report;
}

interface DeleteAllReportCriteriaAction {
  type: ActionKeys.REPORT_CRITERIA_DELETE_ALL;
  report: Report;
}

interface RequestProductOptionsAction {
  type: ActionKeys.PRODUCT_OPTIONS_REQUEST;
}

interface ReceiveProductOptionsAction {
  type: ActionKeys.PRODUCT_OPTIONS_RECEIVE;
  productOptions: ProductOption[];
}

interface ErrorProductOptionsAction {
  type: ActionKeys.PRODUCT_OPTIONS_ERROR;
  error: string;
}

interface SetCurrentInstitutionSetIdAction {
  type: ActionKeys.INSTITUTION_SET_VIEW_SET_CURRENT_ID;
  id: string;
}

interface SetPreviewGridAPIAction {
  type: ActionKeys.PRODUCT_PREVIEW_VIEW_SET_GRID_API;
  api: GridApi;
}

interface SetCurrentReportIdAction {
  type: ActionKeys.REPORTS_VIEW_SET_CURRENT_REPORT_ID;
  id: string;
}
interface SetInstitutionSetDetailAction {
  type: ActionKeys.INSTITUTION_SET_SET_CURRENT_DETAIL;
  id?: string;
}
interface SetReportDetailAction {
  type: ActionKeys.REPORT_SET_CURRENT_DETAIL;
  id?: string;
}

interface SetCurrentProductCriterionAction {
  type: ActionKeys.PRODUCT_CRITERIA_VIEW_SET_CURRENT_PRODUCT_CRITERION;
  id?: string;
}

interface DeleteProductCriterionAction {
  type: ActionKeys.PRODUCT_CRITERIA_DELETE;
  id: string;
  reportId: string;
}

interface SetStatesSelectedAction {
  type: ActionKeys.INSTITUTION_SELECT_VIEW_SET_STATES_SELECTED;
  stateCodes: string[];
}

interface SetSelectedLoadIdAction {
  type: ActionKeys.INSTITUTION_SELECT_VIEW_SET_SELECTED_LOAD_ID;
  id?: string;
}

interface SetHoldingCompanyCountTabAction {
  type: ActionKeys.INSTITUTION_SELECT_VIEW_SET_HOLDING_COMPANY_COUNT_TAB;
  id: string;
}

interface UnsetUIProductCriterionAction {
  type: ActionKeys.PRODUCT_CRITERIA_VIEW_UNSET_CURRENT_PRODUCT_CRITERION;
}

interface ToggleHoldingCompanySelection {
  type: ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_HOLDING_COMPANY_SELECTION;
  id: string;
}

interface ToggleInstitutionSelectionAction {
  type: ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_INSTITUTION_SELECTION;
  id: string;
}

interface ToggleReportSummaryAction {
  type: ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_SUMMARY;
}

interface ToggleProductChartAction {
  type: ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_CHART;
}

interface ToggleProductSelectionExtractorAction {
  type: ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_EXTRACTOR_SELECTION;
  id: string;
}

interface ToggleProductSelectionBuilderAction {
  type: ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_BUILDER_SELECTION;
  id: string;
}

interface ToggleInstitutionTypeAction {
  type: ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_INSTITUTIONTYPE;
  id: string;
}

interface ToggleProductCriterionSelectionAction {
  type: ActionKeys.PRODUCT_CRITERIA_VIEW_TOGGLE_SELECTION;
  id: string;
  reportId: string;
}

interface ToggleProductCriteriaList {
  type: ActionKeys.UI_PRODUCT_CRITERIA_LIST_TOGGLE;
}

interface RemoveReportTagAction {
  type: ActionKeys.REPORT_REMOVE_TAG;
  reportId: string;
  tagId: string;
}

interface RemoveInstitutionSetTagAction {
  type: ActionKeys.INSTITUTION_SET_REMOVE_TAG;
  institutionSetId: string;
  tagId: string;
}

interface RemoveTagAction {
  type: ActionKeys.TAGS_REMOVE;
  id: string;
}

interface SetProductCriteriaTab {
  type: ActionKeys.PRODUCT_CRITERIA_VIEW_SET_TAB;
  id: string;
  page: string;
}

interface SetReferenceInstitutionListAction {
  type: ActionKeys.INSTITUTION_LIST_SET_REFERENCE;
  id: string;
  reportId: string;
}

interface SetReportCriteriaTab {
  type: ActionKeys.REPORT_CRITERIA_VIEW_SET_TAB;
  id: string;
  page: string;
}

interface SetStateHoldingCompanyTab {
  type: ActionKeys.INSTITUTION_SELECT_VIEW_SET_STATE_HOLDINGCOMPANY_TAB;
  id: string;
  page: string;
}

interface SelectAllCountiesAction {
  type: ActionKeys.COUNTIES_SELECT_ALL;
  ids: string[];
}

interface SelectAllStatesAction {
  type: ActionKeys.STATES_SELECT_ALL;
  ids: string[];
}

interface SelectReportAction {
  type: ActionKeys.REPORT_SELECT;
  ids: string[];
}

interface SetTagNameAction {
  type: ActionKeys.TAG_NAME_SET;
  name: string;
}

interface RequestTagAction {
  type: ActionKeys.TAGS_REQUEST;
}

interface ReceiveTagAction {
  type: ActionKeys.TAGS_RECEIVE;
  tags: Tag[];
}

interface SetReportTypeAction {
  type: ActionKeys.REPORT_SET_REPORT_TYPE;
  id: number;
  reportId: string;
}

interface SetReportCompareTypeDate {
  type: ActionKeys.REPORT_SET_COMPARE_TYPE_DATE;
  reportId: string;
  compareTypeId: number;
  compareDate: Date;
}

interface ErrorTagAction {
  type: ActionKeys.TAGS_ERROR;
  error: string;
}

interface ToggleProductOptionsAction {
  type: ActionKeys.PRODUCT_OPTIONS_TOGGLE;
  id: string;
}

interface ToggleAvailableInstitutionSelection {
  type: ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_AVAILABLE_INSTITUTION_SELECTION;
  id: string;
}

interface ToggleCountySelectionAction {
  type: ActionKeys.COUNTIES_TOGGLE_SELECTION;
  id: string;
}

interface ToggleReportCriteriaPageAction {
  type: ActionKeys.REPORT_CRITERIA_PAGE_TOGGLE;
}

interface ToggleStateExpansionAction {
  type: ActionKeys.STATES_TOGGLE_EXPANSION;
  id: string;
}

interface ToggleStateSelectionAction {
  type: ActionKeys.STATES_TOGGLE_SELECTION;
  id: string;
}

interface ToggleTagSelectionAction {
  type: ActionKeys.TAGS_TOGGLE;
  id: string;
}

interface ToggleMapAction {
  type: ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_MAP;
}

interface ToggleNewInstitutionSetDialogAction {
  type: ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_NEW_INSTITUTION_SET_DIALOG;
}

interface UpdateRangeItemsAction {
  type: ActionKeys.RANGE_ITEMS_UPDATE;
  rangeItem: RangeItem;
}

interface ResetRangeItemListAction {
  type: ActionKeys.PRODUCT_ADD_VIEW_RESET_RANGE;
}

interface ResetRangeItemAction {
  type: ActionKeys.RANGE_ITEMS_RESET;
  id: string;
}

interface UpdateInstitutionSearchTextAction {
  type: ActionKeys.INSTITUTION_SELECT_VIEW_UPDATE_SEARCH_TEXT;
  text: string;
  searchType: 'Available' | 'Selected';
}

export default ActionKeys;

// #endregion
