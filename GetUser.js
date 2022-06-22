const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const github_url='https://api.github.com'

const getUser=(name)=>{
  return fetch(`${github_url}/users/${name}`)
    .then(res=>{
      if(res.status===404) return 'No users found!!'
      return res.json()
    })
}

module.exports={getUser}