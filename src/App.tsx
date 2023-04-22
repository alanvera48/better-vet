import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { store } from "./redux/store";
import Router from "./router";
import Modal from "react-modal";


function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
