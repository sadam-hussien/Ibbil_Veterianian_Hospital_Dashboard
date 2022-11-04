<template>
  <div>
    <dashboard-page-title :showSearch="false" :showFilter="false" :showMainActions="false" @addEvent="$router.push({name: 'addMerchant'})">
    إضافة طبيب
    </dashboard-page-title>
    <ValidationObserver v-slot="{ validate }">
      <form @submit.prevent="validate(onSubmit)">
        <b-row>
          <b-col lg="11">
            <b-row class="justify-content-between mb-5">
              <b-col lg="8">
                <b-row>
                  <b-col md="6" class="mb-3">
                    <input-form placeholder="الاسم بالكامل" label="الإسم بالكامل" name="full-name" v-model="doctor.fullName"></input-form>
                  </b-col>
                  <b-col md="6" class="mb-3">
                    <input-form placeholder="رقم الهاتف" label="رقم الهاتف" name="phone" v-model="doctor.phone"> </input-form>
                  </b-col>
                  <b-col md="6" class="mb-3">
                    <input-form placeholder="رقم الهاتف اخر" label="رقم الهاتف اخر" name="phone2" v-model="doctor.phone2"></input-form>
                  </b-col>
                  <b-col md="6" class="mb-3">
                    <input-form placeholder="البريد الالكترونى" label="البريد الالكترونى" name="email" v-model="doctor.email"></input-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="العنوان" label="العنوان" name="address"  v-model="doctor.address"></input-form>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="3">
                <img-upload-box name="personal-picture" label="الصورة الشخصية" />
              </b-col>
            </b-row>
            <b-row class="mt-5">
              <b-col md="4" class="mb-4" v-for="(itemFile, index) in filesInps" :key="index">
                <img-upload-box :name="itemFile.name" :label="itemFile.label" :editing="itemFile.editing" :index="index" @editLabel="editLabel" />
              </b-col>
            </b-row>
            <b-button class="add-other-picture mt-5 d-flex align-items-center" @click="addMorePicture">
              <i class="las la-plus icon"></i>
              <span>ادخل شهادات اخرى</span>
            </b-button>
          </b-col>
        </b-row>
        <div class="d-flex justify-content-center mt-5">
          <b-button variant="primary" class="vete-save-btn m-auto"> حفظ </b-button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import imgUploadBox from '../components/imgUploadBox'
export default {
  components: { imgUploadBox },
  mounted () {
    core.index()
  },
  data () {
    return {
      filesInps: [
        {
          label: 'صورة الهوية',
          name: 'id-picture'
        },
        {
          label: 'شهادة التخرج',
          name: 'certificate-picture'
        },
        {
          label: 'ترخيص النقابة',
          name: 'other-picture'
        }
      ],
      doctor: {
        fullName: '',
        phone: '',
        phone2: '',
        email: '',
        address: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('hello')
    },
    addMorePicture () {
      this.filesInps.push(
        {
          label: '',
          name: 'other-picture',
          editing: true
        })
    },
    editLabel (index, value) {
      this.filesInps[index].label = value
      this.filesInps[index].editing = false
    }
  }
}
</script>
