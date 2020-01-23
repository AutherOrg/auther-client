const getAll = async () => {
  try {
    await window.fetch('https://api.github.com')
    return []
  } catch (e) {
    return e
  }
}

export default {
  getAll
}
