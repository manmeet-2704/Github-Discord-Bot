const methods=['To get a user profile \n command: gh.user-<username>\n','To get repos \n command: gh.repos-<reponame>\n']

const help=methods.map((method,index)=>`${index+1}. ${method}`).join('\n')

module.exports={help}