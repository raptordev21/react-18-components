import { SelectedValues, SelectMultiTreeSearchOption, SelectMultiTreeSearchOptionRaw, SelectMultiTreeSearchOptions, SelectMultiTreeSearchOptionsRaw } from "./SelectMultiTreeSearchTypes";

export function addIdAndSelectionKeysToOptions(options: SelectMultiTreeSearchOptionsRaw, id: string) {
  return options.map((option: SelectMultiTreeSearchOptionRaw, index: number) => {
    if (id === '') {
      const newOption: SelectMultiTreeSearchOption = {
        ...option,
        id: `${index}`,
        selection: 'NOT-SELECTED',
        children: option.children ? addIdAndSelectionKeysToOptions(option.children, `${index}`) : []
      };
      return newOption;
    } else {
      const newOption: SelectMultiTreeSearchOption = {
        ...option,
        id: `${id}-${index}`,
        selection: 'NOT-SELECTED',
        children: option.children ? addIdAndSelectionKeysToOptions(option.children, `${id}-${index}`) : []
      };
      return newOption;
    }
  });
}

export function getHighestParentsSelected(options: SelectMultiTreeSearchOptions) {
  const selectedItems: SelectedValues[] = [];

  for (const option of options) {
    if (option.selection === 'SELECTED') {
      selectedItems.push({ id: option.id, value: option.value });
      continue
    }
    if (option.children.length > 0) {
      selectedItems.push(...getHighestParentsSelected(option.children));
    }
  }

  return selectedItems;
}

export function setSelectionsToKey(options: SelectMultiTreeSearchOptions, key: 'SELECTED' | 'NOT-SELECTED') {
  return options.map(option => {
    const newOption: SelectMultiTreeSearchOption = {
      ...option,
      selection: key,
      children: option.children ? setSelectionsToKey(option.children, key) : []
    };
    return newOption;
  });
}

function setSelectionById(options: SelectMultiTreeSearchOptions, targetId: string, key: 'SELECTED' | 'NOT-SELECTED') {
  return options.map(option => {
    if (option.id.startsWith(targetId)) {
      const newOption: SelectMultiTreeSearchOption = {
        ...option,
        selection: key,
        children: option.children ? setSelectionById(option.children, targetId, key) : []
      };
      return newOption;
    } else {
      const oldOption: SelectMultiTreeSearchOption = {
        ...option,
        children: option.children ? setSelectionById(option.children, targetId, key) : []
      };
      return oldOption;
    }
  });
}

function checkEverySiblingSelectionByKey(options: SelectMultiTreeSearchOptions, key: 'SELECTED' | 'NOT-SELECTED'): boolean {
  return options.every((option: SelectMultiTreeSearchOption) => {
    return option.selection === key
  })
}

function setParentsSelectionKeyWhenIdLength3(newOptions: SelectMultiTreeSearchOptions, targetId: string, checkKey: 'NOT-SELECTED' | 'SELECTED') {
  const siblings = newOptions[parseInt(targetId[0])].children
  if (checkEverySiblingSelectionByKey(siblings, checkKey)) {
    newOptions[parseInt(targetId[0])].selection = checkKey
  } else {
    newOptions[parseInt(targetId[0])].selection = 'CHILD-SELECTED'
  }
}

function setParentsSelectionKeyWhenIdLength5(newOptions: SelectMultiTreeSearchOptions, targetId: string, checkKey: 'NOT-SELECTED' | 'SELECTED') {
  const targetIdArr = targetId.split('-')
  const siblings = newOptions[parseInt(targetIdArr[0])].children[parseInt(targetIdArr[1])].children
  if (checkEverySiblingSelectionByKey(siblings, checkKey)) {
    newOptions[parseInt(targetIdArr[0])].children[parseInt(targetIdArr[1])].selection = checkKey
  } else {
    newOptions[parseInt(targetIdArr[0])].children[parseInt(targetIdArr[1])].selection = 'CHILD-SELECTED'
  }
  const parentSiblings = newOptions[parseInt(targetIdArr[0])].children
  if (checkEverySiblingSelectionByKey(parentSiblings, checkKey)) {
    newOptions[parseInt(targetIdArr[0])].selection = checkKey
  } else {
    newOptions[parseInt(targetIdArr[0])].selection = 'CHILD-SELECTED'
  }
}

export function applySelectionsToTreeById(options: SelectMultiTreeSearchOptions, targetId: string, key: 'NOT-SELECTED' | 'SELECTED') {
  if (key === 'NOT-SELECTED') {
    const newOptions: SelectMultiTreeSearchOptions = setSelectionById(options, targetId, key)
    if (targetId.length === 3) {
      setParentsSelectionKeyWhenIdLength3(newOptions, targetId, key)
    }
    if (targetId.length === 5) {
      setParentsSelectionKeyWhenIdLength5(newOptions, targetId, key)
    }
    return newOptions
  }
  if (key === 'SELECTED') {
    const newOptions: SelectMultiTreeSearchOptions = setSelectionById(options, targetId, key)
    if (targetId.length === 3) {
      setParentsSelectionKeyWhenIdLength3(newOptions, targetId, key)
    }
    if (targetId.length === 5) {
      setParentsSelectionKeyWhenIdLength5(newOptions, targetId, key)
    }
    return newOptions
  }
  return options
}

export function getSelectionType(key: 'SELECTED' | 'NOT-SELECTED' | 'CHILD-SELECTED') {
  if (key === 'SELECTED') {
    return 'NOT-SELECTED'
  } else {
    return 'SELECTED'
  }
}

export const getCheckColor = (selection: 'SELECTED' | 'NOT-SELECTED' | 'CHILD-SELECTED') => {
  if (selection === 'SELECTED') {
    return 'bg-gray-700'
  }
  if (selection === 'NOT-SELECTED') {
    return 'bg-white'
  }
  if (selection === 'CHILD-SELECTED') {
    return 'bg-gray-300'
  }
}