const isAdmin = (userFromRoute) => {
   return  userFromRoute && 
    userFromRoute.user &&
    userFromRoute.user.roles &&
    userFromRoute.user.roles.includes('admin');
}

module.exports = isAdmin;
