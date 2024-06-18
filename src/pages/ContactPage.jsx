import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { UserInfoContext } from "../context/UserInfoContext";

const ContactPage = () => {
  const [g_user] = useContext(UserInfoContext);
  useEffect(() => {
    alert("fa");
    let text = "hello";
    let response = fetch("/test", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: text
    }).then(response => response.text(),
      response => { console.log("登录失败！"); }
    ).then(data => {console.log(data);});
  }, []);

  return (
    <p id="zero-state">
      This is a demo for React Router.

    </p>
  );
}


export default ContactPage;