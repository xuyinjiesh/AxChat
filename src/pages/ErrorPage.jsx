/**
 * @author Yinjie Xu
 * @version 0.1
 * @date 2024-06-21
 */

import { useRouteError } from "react-router-dom";
import "../assets/ErrorPage.scss"

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
