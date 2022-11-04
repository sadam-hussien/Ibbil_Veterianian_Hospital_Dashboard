<template>
  <div class="img-upload-box">
    <h5 class="img-upload-box-label" v-if="!editing">{{label}}</h5>
    <!-- edit label input -->
    <input
      v-if="editing"
      type="text"
      @blur="saveName(index)"
      v-model="certificateName"
      :name="`other-picture-${index}`"
      :id="`other-picture-${index}`"
      placeholder="ادخل اسم الشهادة هنا"
      :class="`form-control edit-inp ${errorLabel ? 'edit-inp-error' : ''}`"
    />
    <!-- file uploader input -->
    <input type="file" class="d-none" :id="`file-uploader-${index}`" :name="`file-uploader-${index}`" @change="addFile"/>
    <!-- box  -->
    <label class="m-0 w-100" :for="`file-uploader-${index}`" @click="handleClick">
      <div class="img-box  d-flex align-items-center justify-content-center flex-column" :style="{backgroundImage: `url(${fileUrl})`, backgroundSize: 'cover'}">
        <div class="img-inner" v-if="!fileUrl">
          <i class="las la-image icon" v-if="!editing"></i>
          <i class="las la-plus-square icon" v-else></i>
        </div>
        <span class="types" v-if="!fileUrl">( PDF - JPG - JPEG - PNG )</span>
      </div>
      <div class="img-upload-box-btn mt-1 text-center py-1">اختر الصورة</div>
    </label>
  </div>
</template>

<script>
export default {
  props: ['name', 'label', 'editing', 'index', 'editLabel'],
  data () {
    return {
      file: null,
      fileUrl: null,
      certificateName: '',
      errorLabel: false
    }
  },
  methods: {
    addFile (e) {
      const targetFile = e.target.files[0]
      this.file = targetFile
      this.fileUrl = URL.createObjectURL(targetFile)
    },
    saveName (index) {
      if (this.certificateName) {
        // this.label = this.certificateName
        // this.editing = false
        this.$emit('editLabel', index, this.certificateName)
      }
    },
    handleClick (e) {
      if (this.editing) {
        e.preventDefault()
        this.errorLabel = true
      } else {
        this.errorLabel = false
        return true
      }
    }
  }
}
</script>
