"use server";
export const login = async (_: any, formData: FormData) => {
  const resultState = {
    state: 201,
    result: null,
    message: "",
  };

  try {
    console.log(formData);
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      resultState.state = 400;
      resultState.message = e.message;
    }
    return resultState;
  }
};
