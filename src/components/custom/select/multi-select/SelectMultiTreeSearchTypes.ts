export type SelectedValues = {
  id: string
  value: string
}

export type SelectMultiTreeSearchOption = {
  id: string
  value: string
  selection: 'SELECTED' | 'NOT-SELECTED' | 'CHILD-SELECTED'
  children: SelectMultiTreeSearchOption[]
};

export type SelectMultiTreeSearchOptions = SelectMultiTreeSearchOption[]

export type onChange = (value: SelectMultiTreeSearchOptions) => void