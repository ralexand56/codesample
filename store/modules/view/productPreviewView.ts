import { Reducer } from 'redux';
import { toggleSelectionByArray } from 'src/modules/common/Helpers';
import ActionKeys, { Action, ProductPreviewViewState } from 'src/types';

const initialState: ProductPreviewViewState = {
  gridApi: undefined,
  selectedExtractorProductIds: [],
  selectedBuilderProductIds: [],
  showReportSummary: true,
  showChart: false,
  showChartTab: true,
  showSaveDialog: false,
  saveName: '',
  saveDescription: '',
};

const reducer: Reducer<ProductPreviewViewState, Action> = (
  state = initialState,
  action
): ProductPreviewViewState => {
  switch (action.type) {
    case ActionKeys.PRODUCT_PREVIEW_VIEW_SET_GRID_API:
      return { ...state, gridApi: action.api };

    case ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_CHART:
      return { ...state, showChart: !state.showChart };

    case ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_EXTRACTOR_SELECTION:
      return {
        ...state,
        selectedExtractorProductIds: toggleSelectionByArray(
          state.selectedExtractorProductIds,
          action.id
        ),
      };

    case ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_BUILDER_SELECTION:
      return {
        ...state,
        selectedBuilderProductIds: toggleSelectionByArray(
          state.selectedBuilderProductIds,
          action.id
        ),
      };

    case ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_SAVE_DIALOG:
      return { ...state, showSaveDialog: !state.showSaveDialog };

    case ActionKeys.PRODUCT_PREVIEW_VIEW_UPDATE_NAME_SAVE_DIALOG:
      return { ...state, saveName: action.name };

    case ActionKeys.PRODUCT_PREVIEW_VIEW_UPDATE_DESCRIPTION_SAVE_DIALOG:
      return { ...state, saveDescription: action.description };

    case ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_SUMMARY:
      return { ...state, showReportSummary: !state.showReportSummary };

    default:
      return state;
  }
};

export default reducer;
