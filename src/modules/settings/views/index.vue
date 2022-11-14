<template>
  <div>
    <dashboard-page-title :showSearch="false" :showFilter="false" :showMainActions="false" @addEvent="$router.push({name: 'addMerchant'})">
      الاعدادات
    </dashboard-page-title>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(onSubmit)">
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
                          v-model="clinicData.clinic_name"
                          validate="required"
                          name="name"
                          placeholder="محمود سيد" label="اسم العيادة"
                        />
                      </b-col>
                      <b-col  xl="6">
                        <b-row>
                          <b-col lg="8">
                            <input-form
                              class="mb-3 joining-label"
                              v-model="clinicData.primary_phone_number"
                              validate="required|numeric"
                              name="phone"
                              placeholder="433423556232" label="رقم الهاتف"
                            />
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
                      <b-col  xl="6">
                        <input-form
                          class="mb-3 joining-label"
                          v-model="clinicData.email"
                          :validate="'required|email'"
                          name="id"
                          placeholder="Mahmoudsayed@gmail.com" label="البريد الالكترونى"
                        />
                      </b-col>
                      <b-col  xl="6">
                        <b-row>
                          <b-col lg="8">
                            <input-form
                              class="mb-3 joining-label"
                              v-model="clinicData.secondary_phone_number"
                              :validate="'numeric'"
                              name="phone2"
                              placeholder="991348741947" label="رقم هاتف اخر"
                            />
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
                      <b-col  md="12">
                        <input-form
                          class="mb-3 joining-label"
                          v-model="clinicData.clinic_address"
                          :validate="'required'"
                          name="address"
                          placeholder="مدينة الصفا - شارع الأمل مبني 18" label="عنوان العيادة"
                        />
                      </b-col>
                      <b-col  md="12">
                        <input-form
                          class="mb-3 joining-label"
                          v-model="clinicData.iban"
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
                <div class="" v-if="work_times.length">
                  <h5 class="text-primary">مواعيد العمل</h5>
                  <div class="p-4">
                    <div class="d-flex align-items-center gap_1 time-of-work-item flex-wrap" v-for="(timeOfWork, index) in work_times" :key="index">
                      <div class="time-of-work-item-controls d-flex align-items-center gap_1">
                        <span class="time-of-work-item-controls-label font-size-20">{{timeOfWork.day}}</span>

                        <b-form-checkbox
                          :id="`time-of-work-item-controls-checkbox-${index}`"
                          v-model="timeOfWork.is_active"
                          :name="`time-of-work-item-controls-checkbox-${index}`"
                          class="d-flex align-items-center dashboard-custom-checkbox time-of-work-item-controls-checkbox"
                          :value="false"
                          :unchecked-value="true"
                          ariaDescribedby="item-checkbox-day"
                        >
                          مغلق
                        </b-form-checkbox>
                      </div>
                      <div v-if="timeOfWork.is_active" class="d-flex flex-column gap_1">
                        <div class="d-flex align-items-center gap_4  flex-wrap" v-for="(timeItem, idx) in timeOfWork.working_periods" :key="idx">
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
                          <b-button v-if="idx === timeOfWork.working_periods.length - 1" class="d-flex align-items-center d-flex align-items-center bg-transparent border-0 p-0 time-of-work-item-add-btn" @click="addTimeOfWork(index)">
                            <i class="las la-clock icon"></i>
                            <span>اضافة فترة عمل اخرى</span>
                          </b-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-card>
            </div>
            <div class="d-flex justify-content-center">
              <b-button variant="primary" class="vete-save-btn m-auto" type="submit" v-if="!loadingButtonSubmit"> حفظ </b-button>
              <b-button variant="primary" class="vete-save-btn m-auto" v-else> <spinner-loading :text="'يتم التحميل'"></spinner-loading> </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import doctorApi from '../services/settings'
export default {
  mounted () {
    core.index()
  },
  data () {
    return {
      loadingButtonSubmit: false,
      clinicData: {},
      userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).data.user : {},
      work_times: [],
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
      this.work_times[idx].working_periods.push({ from: '', to: '' })
    },
    getClinicInfo () {
      doctorApi.getClinicInfo().then(response => {
        console.log('clinic info .....', response.data)
        this.clinicData = response.data
      })
    },
    onSubmit () {
      this.loadingButtonSubmit = true
      // handle work times
      const workOfTimes = this.work_times.map(item => {
        if (item.is_active) {
          return item
        } else {
          return {
            ...item,
            working_periods: []
          }
        }
      })
      const payload = {
        clinic_name: this.clinicData.clinic_name,
        email: this.clinicData.email,
        primary_phone_number: this.clinicData.primary_phone_number,
        secondary_phone_number: this.clinicData.secondary_phone_number,
        clinic_address: this.clinicData.clinic_address,
        work_times: workOfTimes
      }
      console.log(payload)

      doctorApi.updateClinicInfo(payload).then(response => {
        core.showSnackbar('success', 'updated')
      }).finally(() => {
        this.loadingButtonSubmit = false
      })
    }
  },
  watch: {
    clinicData (val) {
      if (val) {
        // work times
        // add initial item for inactive days
        const newItems = val.work_times.map(item => {
          if (!item.is_active) {
            if (item.working_periods.length) {
              return item
            } else {
              return {
                ...item,
                working_periods: [{ to: '', form: '' }]
              }
            }
          } else {
            return item
          }
        })
        this.work_times = newItems
      }
    }
  },
  created () {
    this.getClinicInfo()
  }
}
</script>
