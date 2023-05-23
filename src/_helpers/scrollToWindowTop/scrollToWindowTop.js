const scrollToWindowTop = (behavior = '') => {
  const scrollTop =
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop
  if (scrollTop !== 0) window.scrollTo({ top: 0, behavior })
}

export default scrollToWindowTop
