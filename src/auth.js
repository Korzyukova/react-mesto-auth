export async function tokenCheck() {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch("https://auth.nomoreparties.co/users/me", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => {
      err && console.error(err);
    });
    const data = await response.json();
    if (data) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export async function signIn(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  const response = await fetch(
    "https://auth.nomoreparties.co/signin",
    requestOptions
  );
  const data = await response.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    return true;
  } else {
    return false;
  }
}

export async function signUp(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  const response = await fetch(
    "https://auth.nomoreparties.co/signup",
    requestOptions
  );
  const data = await response.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.assign("/");
    return true;
  } else {
    return false;
  }
}
