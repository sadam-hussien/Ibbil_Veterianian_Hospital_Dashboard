<template>
  <div>
    <dashboard-page-title :showSearch="false" :showFilter="false" :showMainActions="false" @addEvent="$router.push({name: 'addMerchant'})">
      الاعدادات
    </dashboard-page-title>
    <!--    {{storeActive}}-->
    <ValidationObserver v-slot="{ validate }">
      <form @submit.prevent="validate(onSubmit)">
        <b-row>
          <b-col md="10">
            <div>
              <b-card class="iq-border-radius-10 mb-4">
                <template v-slot:header>
                  <h5 class="text-primary">البيانات الشخصية</h5>
                </template>
                <b-row>
                  <b-col lg="3">
                    <img src="@/assets/images/ibbil/images/user-profile.jpg" class="img-fluid rounded-circle settings-user-profile" />
                  </b-col>
                  <b-col lg="9">
                    <b-row>
                      <b-col  xl="6">
                        <input-form
                            class="mb-3 joining-label"
                            v-model="userInfo.name"
                            validate="required"
                            name="name"
                            placeholder="عيادة الامل" label="بيانات العيادة"
                        />
                      </b-col>
                      <b-col  xl="6">
                        <input-form
                            class="mb-3 joining-label"
                            v-model="userInfo.phone"
                            validate="required"
                            name="phone"
                            placeholder="433423556232" label="رقم الهاتف"
                        />
                      </b-col>
                      <b-col  xl="6">
                        <input-form
                          class="mb-3 joining-label"
                          v-model="userInfo.email"
                          :validate="'required|numeric'"
                          name="id"
                          placeholder="Mahmoudsayed@gmail.com" label="البريد الالكترونى"
                        />
                      </b-col>
                      <b-col  xl="6">
                        <input-form
                          class="mb-3 joining-label"
                          v-model="userInfo.phone2"
                          :validate="'numeric'"
                          name="phone2"
                          placeholder="991348741947" label="رقم هاتف اخر"
                        />
                      </b-col>
                      <b-col  md="12">
                        <input-form
                          class="mb-3 joining-label"
                          v-model="userInfo.address"
                          validate="required|string"
                          name="address"
                          placeholder="مدينة الصفا - شارع الأمل مبني 18" label="عنوان العيادة"
                        />
                      </b-col>
                      <b-col  md="12">
                        <input-form
                          class="mb-3 joining-label"
                          v-model="userInfo.iban"
                          :validate="'numeric'"
                          name="iban"
                          placeholder="349257295729875928745024" label="رقم IBAN"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="iq-border-radius-10 mb-4">
                <template v-slot:header>
                  <h5 class="text-primary">مواعيد العمل</h5>
                </template>
                <div class="pr-4">
                    <div class="d-flex align-items-center gap_1 time-of-work-item flex-wrap" v-for="(timeOfWork, index) in timesOfWork" :key="index">
                      <div class="time-of-work-item-controls d-flex align-items-center gap_1">
                        <span class="time-of-work-item-controls-label font-size-20">{{timeOfWork.day}}</span>

                        <b-form-checkbox
                          :id="`time-of-work-item-controls-checkbox-${index}`"
                          v-model="timeOfWork.isOpen"
                          :name="`time-of-work-item-controls-checkbox-${index}`"
                          class="d-flex align-items-center dashboard-custom-checkbox time-of-work-item-controls-checkbox"
                        >
                          مغلق
                        </b-form-checkbox>
                      </div>
                      <div  v-if="!timeOfWork.isOpen" class="d-flex flex-column gap_1">
                        <div class="d-flex align-items-center gap_4  flex-wrap" v-for="(timeItem, idx) in timeOfWork.times" :key="idx">
                          <div class="d-flex align-items-center gap_1">
                            <h6 class="setting-box-title time-of-work-item-label font-size-20">من</h6>
                            <flat-pickr
                              v-model="timeItem.from"
                              :config="config"
                              class="form-control time-of-work-item-controls-date"
                              placeholder="Select time"
                              name="time-of-work-item-controls-date"
                            />
                          </div>
                          <div class="d-flex align-items-center gap_1">
                            <h6 class="setting-box-title time-of-work-item-label font-size-20">الى</h6>
                            <flat-pickr
                              v-model="timeItem.to"
                              :config="config"
                              class="form-control time-of-work-item-controls-date"
                              placeholder="Select time"
                              name="time-of-work-item-controls-date-to"
                            />
                          </div>
                          <b-button v-if="idx === timeOfWork.times.length - 1" class="d-flex align-items-center d-flex align-items-center bg-transparent border-0 p-0 time-of-work-item-add-btn" @click="addTimeOfWork(index)">
                            <i class="las la-clock icon"></i>
                            <span>اضافة فترة عمل اخرى</span>
                          </b-button>
                        </div>
                      </div>
                    </div>
                  </div>
              </b-card>
            </div>
            <div class="d-flex justify-content-center">
              <b-button variant="primary" class="vete-save-btn m-auto"> حفظ </b-button>
            </div>
          </b-col>
        </b-row>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  mounted () {
    core.index()
  },
  data () {
    return {
      userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).data.user : {},
      selected: [],
      options: [
        { item: { notification: true }, name: 'كشف عيادة' },
        { item: { sms: true }, name: 'زيارة منزلية' },
        { item: { email: true }, name: 'استشارة هاتفية' }
      ],
      prices: {
        clinicPrice: '',
        consultationPrice: '',
        homePrice: '',
        phonePrice: ''
      },
      selectedDetectionMethod: 'first',
      optionsDetectionMethod: [
        { text: 'بأولوية الحضور', value: 'first' },
        { text: 'ميعاد محدد', value: 'specific' }
      ],
      detectionTime: {
        hours: '',
        minutes: ''
      },
      timesOfWork: [
        {
          day: 'السبت',
          isOpen: false,
          times: [
            { from: '', to: '' }
          ]
        },
        {
          day: 'الاحد',
          isOpen: false,
          times: [
            { from: '', to: '' }
          ]
        },
        {
          day: 'الاتنين',
          isOpen: false,
          times: [
            { from: '', to: '' }
          ]
        },
        {
          day: 'الثلاثاء',
          isOpen: false,
          times: [
            { from: '', to: '' }
          ]
        },
        {
          day: 'الاربعاء',
          isOpen: false,
          times: [
            { from: '', to: '' }
          ]
        },
        {
          day: 'الخميس',
          isOpen: false,
          times: [
            { from: '', to: '' }
          ]
        },
        {
          day: 'الجمعة',
          isOpen: true,
          times: [
            { from: '', to: '' }
          ]
        }
      ],
      config: {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: false,
        defaultDate: '14:30'
      }
    }
  },
  methods: {
    addTimeOfWork (idx) {
      this.timesOfWork[idx].times.push({ from: '', to: '' })
    }
  }
}
</script>
