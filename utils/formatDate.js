function formateDate(date) {
  return new Date(date).toLocaleDateString('en-US')
}

export default formateDate;