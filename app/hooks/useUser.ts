import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { type User } from "@/store/userStore";

const useUser = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const authHandler = async (token: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/user`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      // Todo token 만료 처리??
      console.log(res.statusText);
    }

    const result: User = await res.json();
    setUser(result.id as string, result.nickname as string, result.role);
  };

  useEffect(() => {
    if (user) return;

    if (!user) {
      const accessToken = localStorage.getItem("at");
      if (!accessToken) return;

      authHandler(JSON.parse(accessToken));
    }
  }, [user]);

  return user;
};

export default useUser;
