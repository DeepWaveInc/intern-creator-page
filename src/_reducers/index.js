import { combineReducers } from 'redux'
import { authentication } from './authentication.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import { modal } from './modal.reducer'
import { notify } from './notify.reducer'
import { meta } from './meta.reducer'
import { upload } from './upload.reducer'
import { listUpdate } from './listUpdate.reducer'
import { subscription } from './subscription.reducer'

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  modal,
  notify,
  meta,
  upload,
  subscription,
  listUpdate
})

export default rootReducer
