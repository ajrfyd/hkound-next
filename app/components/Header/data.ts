export const headerData = {
  logo: "klog",
  nav: [
    {
      url: "/",
      title: "Blog",
    },
    {
      url: "/profile",
      title: "Profile",
    },
  ],
  headerEnd: [
    {
      url: process.env.NEXT_PUBLIC_GITHUB_REPO,
      bootstrapIcon: "bi bi-github",
      target: "_blank",
    },
    // {
    //   url: "/login",
    //   bootstrapIcon: "fa fa-user",
    //   target: null,
    // },
    // {
    //   url: "/chat",
    //   bootstrapIcon: "fa fa-regular fa-comment-dots",
    //   target: null,
    //   chat: true,
    // },
  ],
};
