// library
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import "./i18n";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";

// store
import { BrowserRouter } from "react-router-dom";

// component
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// styles
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <App />
        <ToastContainer autoClose={2000} />
        <ReactQueryDevtools initialIsOpen={false} />
      </CookiesProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
