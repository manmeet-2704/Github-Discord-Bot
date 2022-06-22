const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const github_url='https://api.github.com'

const getRepos=(name)=>{
  return fetch(`${github_url}/search/repositories?q=${name}&sort=stars&order=desc`)
    .then(res=>{
      return res.json()
    }).then(res=>{
      if(res.total_count===0) return 'No repos found!!'
      const repos=res.items.slice(0,10)
      return repos
    })
}

module.exports={getRepos}