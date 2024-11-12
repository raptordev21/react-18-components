import { SelectMultiCheckSearchAllOption } from "./SelectMultiCheckSearchAll";

function checkIfAllAlreadyPresentInOptions(options: SelectMultiCheckSearchAllOption[]) {
  let isAllAlreadyPresentInOptions = false
  for (const option of options) {
    if (option.label === 'ALL' && option.value === 'ALL') {
      isAllAlreadyPresentInOptions = true
    }
  }
  return isAllAlreadyPresentInOptions
}

export function addAllAtStartInOptionsArray(options: SelectMultiCheckSearchAllOption[]) {
  if (checkIfAllAlreadyPresentInOptions(options)) {
    return options
  } else {
    const ALL = { label: 'ALL', value: 'ALL' }
    options.unshift(ALL)
    const newOptions = [...options]
    return newOptions
  }
}

export function removeAllInOptionsArray(options: SelectMultiCheckSearchAllOption[]) {
  if (checkIfAllAlreadyPresentInOptions(options)) {
    return options.filter(option => option.label !== 'ALL' && option.value !== 'ALL')
  } else {
    return options
  }
}