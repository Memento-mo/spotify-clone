import Vue from 'vue'

declare module 'vue/types/vue' {
  interface VueConstructor {
    stringify: any
    $router: any
  }
}
