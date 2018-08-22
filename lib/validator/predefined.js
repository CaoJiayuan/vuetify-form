
function maxOrMin(v, m, max = true) {
  if (v === undefined || v === null) {
    return true
  }

  let number = parseInt(v);
  if (!isNaN(number)) {
    return max ? number <= m : number >= m
  } else {
    return max ? v.length <= m : v.length >= m
  }

}


const predefined = {
  max: maxOrMin,
  min: (v, m) => maxOrMin(v, m, false),
  required: v => !!v
}


export default predefined
