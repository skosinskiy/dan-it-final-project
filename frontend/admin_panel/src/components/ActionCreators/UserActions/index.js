export const fetchCurrentUser = () => {
  const policy = 'no-referrer'
  return fetch('http://localhost:9000/api/users/current', {referrerPolicy: policy})
    .then(resp => resp.json())
    .catch(err => console.log(err))
  // Name: "I'm user!"
}

export default fetchCurrentUser