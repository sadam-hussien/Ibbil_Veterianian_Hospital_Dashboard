<template>
  <div>
    <dashboard-page-title :showSearch="false" :showFilter="false" :showMainActions="false" @addEvent="$router.push({name: 'addMerchant'})">
    إضافة طبيب
    </dashboard-page-title>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col lg="11">
            <b-row class="justify-content-between mb-5">
              <b-col lg="8">
                <b-row>
                  <b-col md="6" class="mb-3">
                    <input-form placeholder="الاسم بالكامل" label="الإسم بالكامل" name="full-name" v-model="doctor.full_name"></input-form>
                  </b-col>
                  <b-col md="6" class="mb-3">
                    <b-row>
                      <b-col lg="8">
                        <input-form placeholder="رقم الهاتف" label="رقم الهاتف" name="phone" v-model="doctor.primary_phone_number"> </input-form>
                      </b-col>
                      <b-col lg="4">
                        <div class="d-flex flex-column">
                          <label >رمز الدولة</label>
                          <vue-country-code
                            v-model="code"
                            @onSelect="onSelect"
                            :onlyCountries="['sa', 'eg']"
                            :dropdownOptions="{ disabledDialCode: true }"
                            :enabledCountryCode= true
                            defaultCountry="sa"
                            class="testphone"
                          />
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col md="6" class="mb-3">
                    <input-form placeholder="البريد الالكترونى" label="البريد الالكترونى" name="email" v-model="doctor.email"></input-form>
                  </b-col>
                  <b-col md="6" class="mb-3">
                    <b-row>
                      <b-col lg="8">
                        <input-form placeholder="رقم الهاتف اخر" label="رقم الهاتف اخر" name="phone2" v-model="doctor.secondary_phone_number"></input-form>
                      </b-col>
                      <b-col lg="4">
                        <div class="d-flex flex-column">
                          <label >رمز الدولة</label>
                          <vue-country-code
                            v-model="code"
                            @onSelect="onSelect"
                            :onlyCountries="['sa', 'eg']"
                            :dropdownOptions="{ disabledDialCode: true }"
                            :enabledCountryCode= true
                            defaultCountry="sa"
                            class="testphone"
                          />
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="العنوان" label="العنوان" name="address"  v-model="doctor.address"></input-form>
                  </b-col>
                </b-row>
              </b-col>
              <b-col :md="index === 0 ? 3 : 4" class="mb-4" v-for="(itemFile, index) in requiredDocuments" :key="index">
                <img-upload-box :data="itemFile" :index="index" @uploadDocument="uploadDocument" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <div class="d-flex justify-content-center mt-5">
          <b-button variant="primary" class="vete-save-btn m-auto" type="submit" v-if="!loadingButtonSubmit"> حفظ </b-button>
          <b-button variant="primary" class="vete-save-btn m-auto" v-else> <spinner-loading :text="'يتم التحميل'"></spinner-loading> </b-button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import doctorApi from '../services/doctors'
import imgUploadBox from '../components/imgUploadBox'
export default {
  components: { imgUploadBox },
  mounted () {
    core.index()
  },
  data () {
    return {
      loadingButtonSubmit: false,
      doctor: {
        full_name: '',
        primary_phone_number: '',
        secondary_phone_number: '',
        email: '',
        address: '',
        national_id: ''
      },
      requiredDocuments: null,
      uploadedDcouments: []
    }
  },
  methods: {
    onSubmit () {
      this.loadingButtonSubmit = true
      doctorApi.addDoctor({
        doctor_data: this.doctor,
        doctor_documents: this.uploadedDcouments
      }).then(response => {
        core.showSnackbar('success', response.data.message)
      }).finally(() => {
        this.loadingButtonSubmit = false
      })
    },
    getRequiredDocuments () {
      doctorApi.getRequiredDocuments().then(response => {
        this.requiredDocuments = response.data.data
      })
    },
    uploadDocument (file) {
      const fileExist = this.uploadedDcouments.find(f => f.doc_id === file.doc_id)
      if (fileExist) {
        const docs = this.uploadedDcouments.filter(item => item.doc_id === file.doc_id)
        this.uploadedDcouments = docs
      } else {
        this.uploadedDcouments.push(file)
      }
    }
  },
  created () {
    this.getRequiredDocuments()
  }
}
</script>
