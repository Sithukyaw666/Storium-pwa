import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
//componenet import
import Header from "./components/Header";
import Feeds from "./components/Feeds";
import Editor from "./components/Editor";
import Login from "./components/Login";
import StoryView from "./components/StoryView";
import Register from "./components/Register";
import Profile from "./components/Profile";

function App() {
  const client = new ApolloClient({
    uri: "https://storium-api.herokuapp.com/graphql",
    cache: new InMemoryCache(),
    credentials: "include",
  });

  return (
    <div className="App w-full h-full   ">
      <ApolloProvider client={client}>
        <Router>
          <Header />

          <Switch>
            <Route path="/" exact component={Feeds} />
            <Route path="/editor" component={Editor} />
            <Route path="/login" component={Login} />
            <Route path="/story/:id" component={StoryView} />
            <Route path="/register" component={Register} />
            <Route path="/profile/:id" component={Profile} />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
