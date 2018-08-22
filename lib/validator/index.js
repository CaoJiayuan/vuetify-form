import en from './en'

const sprintf = require('sprintf');

import predefined from './predefined'

let lang = en;

let languages = {
  en
};

export function register(rule, fn) {
  predefined[rule] = fn
}

export function registerLang(l, data) {
  languages[l] = data
}

export function message(attr, rule, v, ...args) {
  let r = lang[rule];

  if (!r) {
    return sprintf(rule, attr, ...args);
  }

  if (typeof r === 'object') {
    return sprintf(r[typeof v], attr, ...args)
  }
  return sprintf(r, attr, ...args)
}

export function setLang(l) {
  if (typeof l === 'string') {
    lang = languages[l]
  } else {
    lang = Object.assign({}, lang, l)
  }
}

function validator(v, rules, attr) {
  return validate(v, rules, attr)
}

function validate(v, rules, attr) {
  let rs = parseRules(v, rules);

  for (let i = 0; i < rs.length; i++) {
    let params = [v];
    let r = rs[i];
    params.push(...r[1]);
    let result = r[0].apply(this, params);
    if (result !== true) {
      let fail = r[2] ? r[2] : result

      return message(attr, fail, v, ...r[1])
    }
  }
  return true
};

function parseRules(v, rules) {
  if (typeof rules === 'string') {
    return rules.split('|').map(r => {
      let par = r.split(':', 2)
      if (par.length < 2) {
        return [predefined[par[0]], [], par[0]]
      }
      return [predefined[par[0]], par[1].split(','), par[0]]
    })
  }
  if (rules instanceof Array) {
    let result = [];
    rules.forEach(rule => {
      if (typeof rule === 'string') {
        parseRules(v, rule).forEach(r => result.push(r))
      } else {
        result.push([
          rule,
          [v],
          false
        ])
      }
    });
    return result;
  }
  return []
}

export default validator
