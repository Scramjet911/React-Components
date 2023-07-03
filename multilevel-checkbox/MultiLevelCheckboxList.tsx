import { useRef, useState } from 'react';

import { translate } from 'utils/locale';

import Checkbox from './Checkbox';
import CheckboxList from './CheckboxList';
import {
  CheckboxTreeStyles,
  flattenNodes,
  MultiLevelOptions,
} from './types';
import { toggleNodeCheck } from './utils';

interface CheckboxTreeProps {
  allowIndeterminate?: boolean;
  options: MultiLevelOptions[];
  selectedOptions: string[];
  showSelectAll?: boolean;
  styles?: CheckboxTreeStyles;
  handleChange?: (option: MultiLevelOptions, oldState: boolean) => void;
}

const selectAllId = 'checkboxTree_selectAll';

/** Component to render multilevel checkbox lists

  @param allowIndeterminate Boolean to allow indeterminate checkboxes
  @param options Array of multilevel options
  @param selectedOptions string array consisting of id's of the selected options
  @param styles Object giving classnames for component
  @param handleChange function which is called whenever a checkbox is selected
*/
const CheckboxTree = ({
  allowIndeterminate = false,
  options,
  selectedOptions,
  showSelectAll,
  styles,
  handleChange
}: CheckboxTreeProps): JSX.Element => {
  const optionList = useRef([
    {
      id: selectAllId,
      label: translate('selectAll'),
      value: options
    }
  ]);

  const selectedOptionsWithSelectAll = [...selectedOptions];
  if (
    options.every((item) =>
      selectedOptions.find((selected) => item.id === selected)
    )
  ) {
    selectedOptionsWithSelectAll.push(selectAllId);
  }

  const [flatNodes, setFlatNodes] = useState(
    flattenNodes(optionList.current, selectedOptionsWithSelectAll)
  );

  const isCheckboxIndeterminate = (option: MultiLevelOptions): boolean => {
    if (allowIndeterminate && Array.isArray(option?.value)) {
      return option.value.some((child) => flatNodes[child.id].isChecked);
    } else {
      return false;
    }
  };

  const handleCheckboxSelect = (option: MultiLevelOptions) => {
    if (option.id === selectAllId) {
      options.forEach((item) => {
        if (flatNodes[selectAllId].isChecked) {
          if (flatNodes[item.id].isChecked) {
            handleChange(item, true);
          }
        } else if (!flatNodes[selectAllId].isChecked) {
          if (!flatNodes[item.id].isChecked) {
            handleChange(item, false);
          }
        }
      });
    } else {
      handleChange(option, flatNodes[option.id].isChecked);
    }
    setFlatNodes((currentFlatNodes) => {
      return toggleNodeCheck(option, { ...currentFlatNodes });
    });
  };

  return (
    <>
      {showSelectAll && (
        <div className={`flex ${styles?.selectAllContainer}`}>
          <Checkbox
            className={styles?.checkbox}
            isChecked={flatNodes[selectAllId].isChecked}
            onClick={() => handleCheckboxSelect(optionList.current[0])}
          />
          <p className={styles?.label}>{optionList.current[0].label}</p>
        </div>
      )}
      <CheckboxList
        minimizeSubLists={true}
        options={optionList.current[0].value}
        flatNodes={flatNodes}
        styles={styles}
        handleCheckboxSelect={handleCheckboxSelect}
        isCheckboxIndeterminate={isCheckboxIndeterminate}
      />
    </>
  );
};

export default CheckboxTree;
