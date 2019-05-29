const validCredentials = [
  {
    nickname: "name1",
    password: "q"
  },
  {
    nickname: "name2",
    password: "w"
  }
];

function logout() {
  window.location.href = "index.html";

  localStorage.removeItem("userData");
}

function parseDataFromUrl() {
  var sPageURL = decodeURIComponent(window.location.search.substring(1));

  var dataFromUrl = sPageURL.split("&");

  var formData = {};

  for (var i = 0; i < dataFromUrl.length; i++) {
    var item = dataFromUrl[i]; // "name=value"

    var parts = item.split("=");
    formData[parts[0]] = parts[1];
  }

  return formData;
}

function checkCredentials(formData) {
  const { nickname, password } = formData;

  let isValid = false;

  for (let i = 0; i < validCredentials.length; i++) {
    if (
      validCredentials[i].nickname === nickname &&
      validCredentials[i].password === password
    ) {
      isValid = true;
    }
  }

  return isValid;
}

function rememberUser(formData) {
  const { shouldRemember } = formData;
  console.log("rememberUser", formData);

  if (shouldRemember === "on") {
    const formDataString = JSON.stringify(formData);

    localStorage.setItem("userData", formDataString);
  }
}

function checkIsLoggedOn() {
  const userDataJSON = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJSON);
  console.log("checkIsLoggedOn userDataJSON", userDataJSON);
  console.log("checkIsLoggedOn userData", userDataJSON);

  if (!userData) {
    return false;
  }
  {
    const isValid = checkCredentials(userData);
    console.log("checkIsLoggedOn isValid", isValid);

    return isValid;
  }
}

const getUserDataFromStorage = () => {
  const userDataJSON = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJSON);

  return userData;
};

try {
  let formData = parseDataFromUrl();

  const isValid = checkCredentials(formData);
  const isLoggedOn = checkIsLoggedOn();

  if (isLoggedOn) {
    formData = getUserDataFromStorage();
  }

  if (isValid || isLoggedOn) {
    const { nickname } = formData;

    if (!isLoggedOn) {
      rememberUser(formData);
    }

    document.getElementById("name").innerHTML = nickname;
  } else {
    window.location.href = "index.html";
  }
} catch (e) {
  console.log("error", e);
}
