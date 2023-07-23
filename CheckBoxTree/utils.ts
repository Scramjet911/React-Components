import { FlatNodes, MultiLevelOptions } from "./types";

const nodeHasChildren = (value: unknown): value is MultiLevelOptions[] => {
  return Array.isArray(value);
};

/**
 * Function called to toggle checkbox value change
 * @param node the checkbox object which has been toggled
 * @param flatNodes the flattened checkbox Node list
 * @param newState the new state of the checkbox
 * @returns updated FlatNodes object
 */
export const toggleNodeCheck = (
  node: MultiLevelOptions,
  flatNodes: FlatNodes,
  newState?: boolean
): FlatNodes => {
  // Used to recursively propagate state to parent on child changes
  const toggleParentStatus = (
    parent: MultiLevelOptions | undefined,
    isChildChecked: boolean
  ): FlatNodes | undefined => {
    if (!parent) {
      return;
    }
    if (!isChildChecked && flatNodes[parent.id].isChecked) {
      flatNodes[parent.id] = { ...flatNodes[parent.id], isChecked: false };
      toggleParentStatus(flatNodes[parent.id].parent, false);
    } else if (isChildChecked && !flatNodes[parent.id].isChecked) {
      flatNodes[parent.id] = {
        ...flatNodes[parent.id],
        isChecked: (flatNodes[parent.id].value as MultiLevelOptions[]).every(
          (child) => flatNodes[child.id].isChecked
        ),
      };
      toggleParentStatus(flatNodes[parent.id].parent, true);
    }
  };

  // Used to recursively propagate state to child on parent changes
  const toggleChildStatus = (child: MultiLevelOptions, status: boolean) => {
    if (nodeHasChildren(child.value)) {
      child.value.forEach((grandChild) =>
        toggleChildStatus(grandChild, status)
      );
    }
    flatNodes[child.id] = {
      ...flatNodes[child.id],
      isChecked: status,
    };
  };

  // Toggle current checkbox
  flatNodes[node.id] = {
    ...flatNodes[node.id],
    isChecked:
      newState === undefined ? !flatNodes[node.id].isChecked : newState,
  };

  if (flatNodes[node.id].parent) {
    toggleParentStatus(
      flatNodes[node.id].parent,
      !!flatNodes[node.id].isChecked
    );
  }
  if (nodeHasChildren(flatNodes[node.id].value)) {
    toggleChildStatus(node, !!flatNodes[node.id].isChecked);
  }
  return { ...flatNodes };
};

/**
 * Recursively iterate through the checkbox list options and flatten them into an map
 * @param nodes Nested Array of checklist options
 * @param selectedOptions string of id's of the selected options
 * @param parent parent of the current iteration nested array of checklists
 * @returns FlatNodes - a map of node id to the FlatNode component object
 */
export const flattenNodes = (
  nodes: MultiLevelOptions[],
  selectedOptions: string[],
  parent?: MultiLevelOptions
): FlatNodes | undefined => {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return;
  }
  let flatNodes: FlatNodes = {};

  nodes.forEach((node) => {
    // Protect against duplicate node values
    if (flatNodes[node.id] !== undefined) {
      return;
    }

    flatNodes[node.id] = {
      id: node.id,
      label: node.label,
      value: node.value,
      parent,
      isChecked: !!selectedOptions.find((key) => key === node.id),
    };
    if (nodeHasChildren(node.value)) {
      flatNodes = {
        ...flatNodes,
        ...flattenNodes(node.value, selectedOptions, node),
      };
    }
  });
  return flatNodes;
};
