import { createStandardAction } from 'typesafe-actions'

export const toggleMenu = createStandardAction('APP/TOGGLE_MENU')()
export const togglePackagesFilter = createStandardAction('APP/TOGGLE_PACKAGES_FILTER')()