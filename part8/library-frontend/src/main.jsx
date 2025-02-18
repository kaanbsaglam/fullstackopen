import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {BrowserRouter as Router} from "react-router-dom";
import { ApolloClient, InMemoryCache , ApolloProvider} from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:4000", // Make sure this matches your backend GraphQL server
  cache: new InMemoryCache(),
});





ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
  <Router>
    <App />
  </Router>
  </ApolloProvider>
);
