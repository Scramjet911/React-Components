export const toggleNodeCheck = (
  node: MultiLevelOptions,
  flatNodes: FlatNodes,
  newState?: boolean
): FlatNodes => {
  // Used to recursively propagate state to parent on child changes
  const toggleParentStatus = (
    parent: MultiLevelOptions,
    isChildChecked: boolean
  ): FlatNodes => {
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
        )
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
      isChecked: status
    };
  };

  // Toggle current checkbox
  flatNodes[node.id] = {
    ...flatNodes[node.id],
    isChecked: newState === undefined ? !flatNodes[node.id].isChecked : newState
  };

  if (flatNodes[node.id].parent) {
    toggleParentStatus(flatNodes[node.id].parent, flatNodes[node.id].isChecked);
  }
  if (nodeHasChildren(flatNodes[node.id].value)) {
    toggleChildStatus(node, flatNodes[node.id].isChecked);
  }
  return { ...flatNodes };
};
