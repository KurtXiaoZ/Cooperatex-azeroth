/**
 * 正则表达式常量
 */

export const patterns: any = {
  accountName: /^[a-zA-Z0-9_]{4,16}$/,
  password: /^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{6,20}$/,
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  number: /^\d+(\.\d+)?$/
};