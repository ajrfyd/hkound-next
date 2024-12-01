import { toast } from "react-toastify";

export const transformDateHandler = (date: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
  }).format(new Date(date));

export const encodeUserData = (nickname: string, password: string) =>
  Buffer.from(`${nickname}:${password}`).toString("base64");

type userMapperType = {
  target: "닉네임" | "비밀번호" | null;
  message: string;
  pass: boolean;
  // type: "signup" | "login";
};

type AuthFormType = {
  nickname: string;
  password: string;
  repassword: string | null;
};

export const authFormValid = (
  nickname: string,
  password: string,
  repassword?: string | null,
) => {
  const type = repassword ? "signup" : "login";

  const authFormMapper: userMapperType = {
    target: null,
    message: "",
    pass: false,
  };

  const data: Partial<AuthFormType> = {
    nickname,
    password,
    repassword,
  };

  for (const i of Object.entries(data)) {
    const [key, value] = i;
    const target = key === "nickname" ? "닉네임" : "비밀번호";

    if (!value) {
      if (type === "login" && key === "repassword") continue;
      authFormMapper.target = target;
      authFormMapper.message = `${target}${target === "닉네임" ? "을" : "를"} 입력해 주세요.`;
      return authFormMapper;
    }

    if (value.length < 4) {
      authFormMapper.target = target;
      authFormMapper.message = `${target}${target === "닉네임" ? "은" : "는"} 4자 이상 입력해 주세요.`;
      return authFormMapper;
    }

    if (value.length > 50) {
      authFormMapper.target = target;
      authFormMapper.message = `${target}${target === "닉네임" ? "은" : "는"} 50자 이하로 입력해 주세요.`;
      return authFormMapper;
    }
  }

  authFormMapper.pass = true;

  if (type === "signup") {
    if (password !== repassword) {
      authFormMapper.pass = false;
      authFormMapper.message = "비밀번호가 서로 불일치 합니다.";
    }
  }

  return authFormMapper;
};

export const notify = (message: string, time: number = 1000) =>
  toast(message, { autoClose: time });

export const dateFormat = (date: string) =>
  new Intl.DateTimeFormat("ko", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/seoul",
  }).format(new Date(date));

export const getLocalstorage = (key: string) =>
  JSON.parse(localStorage.getItem(key) as string);

export const setLocalstorage = (key: string, data: unknown) =>
  localStorage.setItem(key, JSON.stringify(data));
