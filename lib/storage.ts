/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-08-12 20:19:47
 * @Description: 存储配置
 */
import Store from 'electron-store'

import { getValue, setValue } from '#/ipc'

// 初始化 store
export const store = new Store({
  // 版本更新初始化
  migrations: {
    '>=0.3.0': (store) => {
      store.clear()
    },
  },
})

/**
 * @description: 保存值
 * @param {string} node 节点名
 * @param {string} key 键名
 * @param {any} value 值
 * @return {*}
 */
export const cset = (node: string, key: string, value: any): void => {
  store.set(node + '.' + key, value) // 存储值
}

/**
 * @description: 读取值
 * @param {*} node 节点名
 * @param {*} key 键名
 * @return {*}
 */
export const cget = (node: string, key: string): any => {
  return store.get(node + '.' + key) // 读取值
}

/**
 * @description:  storage 构造器
 * @return {*}
 */
export const storage = (): any => {
  return {
    // 保存值
    set: (key: string, value: any) => {
      setValue(key, value)
    },
    // 读取值
    get: (key: string, define: any) => {
      const value = getValue(key)
      return value === undefined ? define : value
    },
  }
}
