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
import UpdateEditor from "./components/UpdateEditor";
import Followers from "./components/Followers";
import Followings from "./components/Followings";

function App() {
  const client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <div className="App w-full h-full ">
      <ApolloProvider client={client}>
        <Router>
          <Header />

          <Switch>
            <Route path="/" exact component={Feeds} />
            <Route path="/editor" component={Editor} />
            <Route path="/update/:id" component={UpdateEditor} />
            <Route path="/login" component={Login} />
            <Route path="/story/:id" component={StoryView} />
            <Route path="/register" component={Register} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/:id/followers" component={Followers} />
            <Route path="/:id/followings" component={Followings} />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
