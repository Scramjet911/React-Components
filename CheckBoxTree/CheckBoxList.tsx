import { Disclosure } from "@headlessui/react";
import { Fragment } from "react";

import { ChevronDown } from "assets/icons";

import { MultiLevelOptions, CheckboxTreeStyles, FlatNodes } from "./types";
import Checkbox from "./ChecBbox";

interface CheckboxListProps {
  minimizeSubLists?: boolean;
  flatNodes: FlatNodes;
  options: MultiLevelOptions[];
  styles?: CheckboxTreeStyles;
  handleCheckboxSelect: (input: MultiLevelOptions) => void;
  isCheckboxIndeterminate?: (input: MultiLevelOptions) => boolean;
}

const CheckboxList = ({
  flatNodes,
  minimizeSubLists,
  options,
  styles = { checkboxContainer: "" },
  handleCheckboxSelect,
  isCheckboxIndeterminate,
}: CheckboxListProps): JSX.Element => {
  return (
    <>
      {options.map((option) => {
        const { id, label, value } = option;
        return (
          <Fragment key={id}>
            {minimizeSubLists && Array.isArray(value) ? (
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      as="div"
                      className={`flex justify-between items-center ${styles?.optionContainer}`}
                    >
                      <div
                        className={`flex items-center ${styles.checkboxContainer}`}
                      >
                        <Checkbox
                          className={styles?.checkbox}
                          isChecked={flatNodes[id].isChecked}
                          isIndeterminate={
                            isCheckboxIndeterminate &&
                            isCheckboxIndeterminate(option)
                          }
                          onClick={(e) => {
                            handleCheckboxSelect(option);
                            e.stopPropagation();
                          }}
                        />
                        <p className={styles?.label}>{label}</p>
                      </div>
                      <ChevronDown
                        className={open ? "rotate-180 transform" : ""}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className={styles?.subList || "ml-7"}>
                      <CheckboxList
                        options={value}
                        minimizeSubLists={minimizeSubLists}
                        flatNodes={flatNodes}
                        styles={styles}
                        handleCheckboxSelect={handleCheckboxSelect}
                        isCheckboxIndeterminate={isCheckboxIndeterminate}
                      />
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ) : (
              <>
                <div className={`flex ${styles?.optionContainer}`} key={id}>
                  <Checkbox
                    className={styles?.checkbox}
                    isChecked={flatNodes[id].isChecked}
                    isIndeterminate={
                      isCheckboxIndeterminate && isCheckboxIndeterminate(option)
                    }
                    onClick={() => handleCheckboxSelect(option)}
                  />
                  <p className={styles?.label}>{label}</p>
                </div>
                {Array.isArray(value) && (
                  <div className={styles?.subList || "ml-7"}>
                    <CheckboxList
                      options={value}
                      minimizeSubLists={minimizeSubLists}
                      flatNodes={flatNodes}
                      styles={styles}
                      handleCheckboxSelect={handleCheckboxSelect}
                      isCheckboxIndeterminate={isCheckboxIndeterminate}
                    />
                  </div>
                )}
              </>
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default CheckboxList;
