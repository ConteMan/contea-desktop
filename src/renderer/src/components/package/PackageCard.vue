<script setup lang="ts">
import { invokeApi } from '@renderer/utils/ipcMessage'
import VueJsonPretty from 'vue-json-pretty'

const data = reactive({
  packageInfo: null as any,
  deep: 0,
})
const { packageInfo, deep } = toRefs(data)

const deal = (data: any) => {
  const { dependencies, devDependencies } = data
  function simple(object: any) {
    const keys = Object.keys(object)
    keys.forEach((key: any) => {
      object[key] = {
        versionDefault: object[key].versionDefault,
        version: object[key].version,
      }
    })
    return object
  }
  data.dependencies = simple(dependencies)
  data.devDependencies = simple(devDependencies)
  return data
}

const get = async () => {
  const res = await invokeApi({
    name: 'package-info',
  })
  if (res)
    data.packageInfo = deal(res)
}
get()

const changeDeep = () => {
  data.packageInfo = { ...data.packageInfo }
  data.deep = data.deep ? 0 : 1
}
</script>

<template>
  <div
    v-if="packageInfo"
    class="package-card p-2"
  >
    <div
      class="font-semibold cursor-pointer select-none mb-2"
      @click="changeDeep()"
    >
      <slot>Package Info</slot>
    </div>
    <VueJsonPretty
      :key="deep"
      :data="packageInfo"
      :deep="deep"
    />
  </div>
</template>
