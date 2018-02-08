// @flow
import { compose, baseActions } from '@client/utils/actions'

const base = {
  ...compose([baseActions], 'users', userReducer, userService)
}

modules.export = {
  ...base
}