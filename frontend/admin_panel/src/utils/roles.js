export const hasGrant = (user, grant) => {
  let roles = user.roles
  for (let i = 0; i < roles.length; i++) {
    let permissions = roles[i].permissions
    for (let j = 0; j < permissions.length; j++) {
      if (permissions[j].indexOf(grant) !== -1) {
        return true
      }
    }
  }
  return false
}