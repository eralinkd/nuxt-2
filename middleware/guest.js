export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useUser();

  if (isAuthenticated.value) {
    return navigateTo("/");
  }
});

