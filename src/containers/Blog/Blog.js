import React, { Component } from 'react';
//import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent'; // async will dynamically prepare extrabundle for potentially loaded code
//import NewPost from './NewPost/NewPost'; // this is included in the web-pack bundle
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                // pathname: this.props.match.url + '/new-post', // how to create a relative path
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>}/>
                <Route path="/" render={() => <h1>Home 2</h1>}/> */}
                <Switch>
                    {/* This works as a guard to authenticate user, if user isn't authenticated
                    the Redirect kicks in and redirects user from new-post to posts.
                    You could do this also in NewPost.js in componentDidMount with for example
                    if (unauth) => this.props.history.replace('/posts')*/}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/posts"  component={Posts} />

                    <Route render={() => <h1>Not found</h1>} />
                    {/* ^^ This is a catch all route, especially for 404 cases. 
                    It routes any unknown routes and should be the last one in Routes.
                    It won't work with Redirect though!!!*
                    In this case it will also catch root ('/') route too and render "Not found"/}
                    
                    {/* <Redirect from="" to="/posts" /> */}
                    {/* OR */}
                    {/* <Route path="/"  component={Posts} /> */}
                </Switch>

            </div>
        );
    }
}

export default Blog;