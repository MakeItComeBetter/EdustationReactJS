import { FETCH_EXAM_API } from "../constance/urlApi";
import { fetchApi } from '../utils/apiCaller';
import { FETCH_EXAM, CLEAR_CURRENT_EXAM } from '../constance/ActionTypes';

export const fetchExamAction = (questions, targetTime, windowToken) => ({ type: FETCH_EXAM, payload: { questions, targetTime, windowToken } })
export const clearCurrentExam = () => ({ type: CLEAR_CURRENT_EXAM })


export const fetchExam = (examId) => async dispatch => {

  try {
    return await fetchApi(`${FETCH_EXAM_API}?id=${examId}`, 'GET')
      .then(res => dispatch(fetchExamAction(res.data?.questions, res.data?.target_time, res.data?.window_token)))
      .catch(e => dispatch(clearCurrentExam()))
  } catch (e) {
    console.error(e.message)
  }


}



