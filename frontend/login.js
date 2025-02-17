const form = document.querySelector("#login-form");

let accessToken = "";

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  const res = await fetch("/login", {
    method: "post",
    body: formData,
  });
  const data = await res.json();
  accessToken = data.access_token;
  console.log(accessToken);

  const infoDiv = document.querySelector("#info");
  infoDiv.innerText = "로그인 되었습니다!!";

  const btn = document.createElement("button");
  btn.innerText = "상품 가져오기!";
  btn.addEventListener("click", async () => {
    try {
      console.log("1. 사용되는 토큰:", accessToken);
      console.log("2. Authorization 헤더:", `Bearer ${accessToken}`);

      const res = await fetch("/items", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("3. 응답 상태:", res.status);
      const responseData = await res.json();
      if (!res.ok) {
        console.log("4. 에러 응답:", responseData);
      }

      console.log("5. 성공 응답:", data);
    } catch (error) {
      console.error("6. 에러 발생:", error);
    }
  });
  infoDiv.appendChild(btn);
};

form.addEventListener("submit", handleSubmit);
