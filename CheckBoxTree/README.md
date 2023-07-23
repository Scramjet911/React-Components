# Checkbox Tree React Component

**CheckboxTree** is a React component that allows you to create checkbox trees. 
It enables users to select options in a hierarchical structure, making it useful for implementing features like nested categories, file directories, or any other multi-level selection scenarios.

## Props

The **CheckboxTree** component accepts the following props:

1. `allowIndeterminate` (boolean, default: false): Specifies whether the checkboxes should support the indeterminate state. If set to true, checkboxes in partially selected states will be shown.

2. `options` (MultiLevelOptions[]): An array of options that represent the checkbox tree's hierarchical structure. Each option in the array should have the following structure:
   - `id` (string | number): A unique identifier for the option.
   - `label` (string): The display label for the option.
   - `value` (MultiLevelOptions[] | undefined): An optional array of child options representing the sub-items of the current option. If not provided or set to undefined, the option will be considered a leaf node.

3. `selectedOptions` (string[]): An array of string or number identifiers representing the currently selected options in the checkbox tree. The component will automatically handle the selection based on this prop.

4. `showSelectAll` (boolean, default: false): Specifies whether to show a "Select All" checkbox at the top of the tree to allow users to select/deselect all options at once.

5. `styles` (object, optional): An object containing custom CSS styles for the different elements of the component.

6. `handleChange` ((option: MultiLevelOptions, checked: boolean) => void): A callback function that will be triggered when the user selects or deselects an option. The function receives the `option` object that was selected/deselected and a boolean `checked` indicating whether the option is now checked (true) or unchecked (false).

## Initialization

To use the **CheckboxTree** component, import it into your React application and render it with the necessary props. Here's an example of how to use it:

```jsx
import React from "react";
import CheckboxTree from "./CheckboxTree";

const options = [
  {
    id: "1",
    label: "Option 1",
    value: [
      {
        id: "1.1",
        label: "Option 1.1",
      },
      {
        id: "1.2",
        label: "Option 1.2",
      },
    ],
  },
  {
    id: "2",
    label: "Option 2",
    value: [
      {
        id: "2.1",
        label: "Option 2.1",
      },
      {
        id: "2.2",
        label: "Option 2.2",
      },
    ],
  },
  // Add more options as needed
];

const MyComponent = () => {
  // Handle the checkbox change event here

  return (
    <CheckboxTree
      allowIndeterminate={true}
      options={options}
      selectedOptions={["1.1", "2.1"]} // Pre-select Option 1.1 and Option 2.1
      showSelectAll={true}
      handleChange={handleCheckboxChange}
      styles={{
        selectAllContainer: "custom-select-all-container-classnames",
        checkbox: "custom-checkbox-classnames",
        label: "custom-label-classnames",
      }}
    />
  );
};

export default MyComponent;
```

## Behavior

- The component renders a hierarchical tree of checkboxes based on the provided `options`.
- The `selectedOptions` prop controls the checked state of the checkboxes in the tree.
- If `allowIndeterminate` is set to true, the checkboxes can have an indeterminate state when some of their child options are selected.
- When the "Select All" checkbox is selected, all options in the tree will be selected. Deselecting "Select All" will deselect all options.
- When an option is selected or deselected, the `handleChange` callback will be called with the corresponding option and its checked state.

## Customization

You can customize the appearance of the **CheckboxTree** component using the `styles` prop. The `styles` prop is an object that can contain CSS class names for specific elements in the component. By providing custom class names, you can apply your own CSS styles to these elements.

Please note that the structure of the `styles` object should match the following:

```js
{
  selectAllContainer: "custom-select-all-container-classnames",
  checkbox: "custom-checkbox-classnames",
  label: "custom-label-classnames",
}
```

- `selectAllContainer`: The class name for the container element of the "Select All" checkbox and its label.
- `checkbox`: The class name for the individual checkboxes in the tree.
- `label`: The class name for the labels of the checkboxes.

## Important Notes

- The component expects each option in the `options` array to have a unique id. Ensure that each option has a unique identifier to avoid unexpected behavior.
- The `selectedOptions` prop should contain valid id values from the options array. Otherwise, the component may not function as expected.
- If you enable the `allowIndeterminate` prop, make sure to provide an array of child options (`value`) for each option in the `options` array.

## Contributions

Contributions to this component are welcome! If you find any issues or want to enhance its functionality, feel free to submit a pull request to the repository. Thank you for using **CheckboxTree**!