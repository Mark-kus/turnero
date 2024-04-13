export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // const isOnAppointment = nextUrl.pathname.startsWith("/appointment");
      const isOnAppointment = true;
      if (isOnAppointment) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // If contains "urlRedirect" query parameter, redirect to that URL
        if (nextUrl.searchParams.has("urlRedirect")) {
          return Response.redirect(
            new URL(nextUrl.searchParams.get("urlRedirect")),
          );
        }
        // Redirect to /appointment if user is authenticated
        return Response.redirect(new URL("/appointment", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
};
