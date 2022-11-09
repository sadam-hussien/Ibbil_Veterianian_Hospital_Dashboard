import { veterainary } from '@/axios'

export default {
  getRequiredDocuments () {
    return veterainary().get('acceptance-docs?required_for=doctors')
  },
  uploadDotorDocument (payload) {
    return veterainary().post('upload', payload)
  },
  addDoctor (payload) {
    return veterainary().post('clinics/add-doctor', payload)
  }
}
