import { fetchPatient } from "../store/slices/patientSlice";
import { fetchPatients } from "../store/slices/patientsListSlice";
import { fetchReports } from "../store/slices/reportListSlice";
import store from "../store/store";

export const reloadStates = async () => {
    const state = store.getState()
    await store.dispatch(fetchPatient({
        role: state.role,
        patientUsername: state.patient['username'],
        centerCenterId: state.user['centerCenterId']
    }))
    await store.dispatch(fetchPatients({
        role: state.role,
        centerId: state.user['centerCenterId']
    }))
    await store.dispatch(fetchReports({
        role: state.role,
        patientUsername: state.patient['username'],
        doctorUsername: state.user['username']
    }))
}