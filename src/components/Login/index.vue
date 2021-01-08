<template>
  <div class="">
    <a-modal
      title="手机登录（网易云音乐账号）"
      centered
      v-model="modalShow"
      :footer="false"
      :mask-closable="false"
      @cancel="onCancel"
    >
      <a-form layout="horizontal" :form="form" @submit="handleSubmit">
        <a-form-item
          :validate-status="phoneError() ? 'error' : ''"
          :help="phoneError() || ''"
        >
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [
                  {
                    required: true,
                    len: 11,
                    pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
                    message: '请输入正确的手机号!'
                  }
                ]
              }
            ]"
            placeholder="手机号"
          >
            <a-icon slot="prefix" type="phone" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          :validate-status="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
        >
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码!' }] }
            ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="hasErrors(form.getFieldsError())"
            @click="login"
            style="width:100%"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const userModule = namespace('user')
interface IUserInfo {
  phone: string
  password: string
}
interface ResponseDataLogin {
  loginType: number
  code: number
  account: any
  token: string
  profile: any
}
@Component({
  components: {}
})
export default class Login extends Vue {
  form: any = null
  modalShow = false

  hasErrors = (fieldsError: any) => {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  private phoneError() {
    const { getFieldError, isFieldTouched } = this.form
    return isFieldTouched('phone') && getFieldError('phone')
  }

  private passwordError() {
    const { getFieldError, isFieldTouched } = this.form
    return isFieldTouched('password') && getFieldError('password')
  }

  private created() {
    this.modalShow = true
    if (!this.form) {
      this.form = this.$form.createForm(this, {})
      this.form.validateFields(['phone', 'password'], { force: true })
    }
  }

  private handleSubmit(e: Event) {
    e.preventDefault()
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.modalShow = false
      }
    })
  }

  @Emit('cancelLogin')
  private onCancel() {
    this.modalShow = false
  }

  @Emit('loginSucceed')
  private async login() {
    const userInfo: IUserInfo = {
      phone: this.form
        .getFieldValue('phone')
        .toString()
        .trim(),
      password: this.form
        .getFieldValue('password')
        .toString()
        .trim()
    }
    await this.ACTION_LOGIN(userInfo)
      .then(async (result: ResponseDataLogin) => {
        this.modalShow = false
        await this.ACTION_LOGIN_STATUS()
      })
      .catch((err: Error) => {
        this.$error({ content: err.message })
      })
  }

  @userModule.Action('LOGIN') ACTION_LOGIN!: Function
  @userModule.Action('LOGIN_STATUS') ACTION_LOGIN_STATUS!: Function
}
</script>
