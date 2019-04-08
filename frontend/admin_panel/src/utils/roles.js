export const hasGrant = (user, grant) => {
  for (const role of user.roles) {
    return role.permissions.includes(grant)
  }
}
