// import {takeEvery, put, call } from 'redux-saga';
// import { AdminAuthSuccessUserData } from '../AuthAdmin-reducer';
// import {getUsersRequest} from '../AuthAdmin-reducer'

// export function* sagaWatcher () {
//     yield takeEvery(AdminAuthSuccessUserData, sagaWorker)
// }

// function* sagaWorker() {
//     try{
//         yield put(getUsersRequest())
//         const payload = yield call(axiosRequest)
//         yield put ({type: SET_ALL_ROLES, payload})
//         yield put(getUsersSuccess())
//     }
//     catch (_error){
//         if (_error.response.status = 403)
//         {
//         alert('Войдите через админа')
//         }
//         console.log(_error)
        
//         yield put(dispatch(getUsersError()))
//     }
  
// }

// async function axiosRequest () {
//     let token = localStorage.getItem('accessToken')
//     const response = await axios(`/api/roles/getallroles`,{
//         headers: {'Authorization':'Bearer ' + token
//     }}
//     )
//     return console.log(response)
// }