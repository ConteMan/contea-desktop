<script setup lang="ts">
import { invokeApi } from '@renderer/utils/ipcMessage'
import { formValueDefault } from '@main/services/taptap/type'

const module = 'taptap'

const data = reactive({
  formRef: null,
  formValue: formValueDefault as any,
  formSize: 'small',
})
const { formRef, formValue, formSize } = toRefs(data)

const getConfig = async () => {
  const res = await invokeApi({
    name: 'configs',
    data: {
      group_key: module,
    },
  })
  if (res)
    data.formValue = res
}
getConfig()

const message = useMessage()

const save = async () => {
  const saveData: any = []
  const formValueData = formValue.value as any
  for (const item in formValueData) {
    saveData.push({
      group_key: module,
      key: item,
      value: formValueData[item],
    })
  }
  const res = await invokeApi({
    name: 'save-configs',
    data: {
      data: saveData,
    },
  })
  message.create(`${res}` ? 'Success' : 'Error', {
    type: res ? 'success' : 'error',
    duration: 2000,
  })
}
</script>

<template>
  <div>
    <n-form
      :ref="formRef"
      :model="formValue"
      :size="formSize"
    >
      <n-form-item label="Enable" path="`${module}_enable`">
        <n-switch v-model:value="formValue[`${module}_enable`]" size="small" checked-value="1" unchecked-value="0" />
      </n-form-item>
      <n-form-item label="Schedule" path="`${module}_schedule`">
        <n-input v-model:value="formValue[`${module}_schedule`]" placeholder="" />
      </n-form-item>
      <n-form-item label="Schedule Enable" path="`${module}_schedule_enable`">
        <n-switch v-model:value="formValue[`${module}_schedule_enable`]" size="small" checked-value="1" unchecked-value="0" />
      </n-form-item>
      <n-form-item label="User ID" path="`${module}_user_id`">
        <n-input v-model:value="formValue[`${module}_user_id`]" placeholder="" />
      </n-form-item>
    </n-form>
    <n-divider />
    <div class="pb-4">
      <n-button
        size="tiny"
        type="primary"
        @click="save()"
      >
        Save
      </n-button>
    </div>
  </div>
</template>
