import { veterainary } from '@/axios'

export default {
  getClinicInfo () {
    return veterainary().get('clinics')
  },
  updateClinicInfo (payload) {
    return veterainary().patch('clinics', payload)
  },
  getRequiredDocuments () {
    return veterainary().get('acceptance-docs?required_for=doctors')
  },
  uploadDotorDocument (payload) {
    return veterainary().post('upload', payload)
  },
  updateDoctorDocuments (payload) {
    return veterainary().post('doctors/documents', payload)
  },
  getDcotorReservation () {
    return veterainary().get('doctor/reservations')
  }
}
