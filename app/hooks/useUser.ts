import { useEffect } from "react";
import { userStore } from "@/store/userStore";
import { type User } from "@/types/types";
import { notify, setLocalstorage } from "@/utils/utils";
import { socketStore } from "@/store/socketStore";

const useUser = () => {
  const user = userStore((state) => state.user);
  const { setUser } = userStore((state) => state);
  const { connect, disconnect } = socketStore((state) => state.actions);
  // const { connect, disconnect, setUser } = userStore();
  // const setUser = userStore((state) => state.setUser);

  const authHandler = async (token: string) => {
    try {
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
        const result = await res.json();
        if (result.statusCode === 401) {
          await reIssueAccessToken();
        }
        notify(result.message);
        return;
      }

      const result: User = await res.json();
      setUser(result.id as string, result.nickname as string, result.role);
      connect(result.id as string);
    } catch (e) {
      if (e instanceof Error) throw Error(e.message, e);
    }
  };

  const reIssueAccessToken = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/token/reissue`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      if (!res.ok) {
        const result = await res.json();
        // Todo 만료된 리프레시 토큰 처리
        return notify(result.message);
      }
      const result = await res.json();
      setLocalstorage("at", result.accessToken);
      authHandler(result.accessToken);
    } catch (e) {
      if (e instanceof Error) throw Error(e.message, e);
    }
  };

  useEffect(() => {
    if (user) return;

    if (!user) {
      const accessToken = localStorage.getItem("at");
      if (!accessToken) return disconnect();

      authHandler(JSON.parse(accessToken));
    }
  }, [user]);

  return user;
};

export default useUser;
