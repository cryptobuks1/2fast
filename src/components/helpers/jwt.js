export const getjwt = () => {
    return localStorage.getItem('user')
}

{/* export const getjwt = () => {
    const user = localStorage.getItem('user')
  
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken }
    } else {
      return {}
    }
  }  */}