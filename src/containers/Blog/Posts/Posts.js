import React, { Component } from "react";
import axios from '../../../axios'; // you could name this as axiosInstance but for practical reasons it's axios
//import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        console.log(this.props);

        axios.get('/posts')
            .then(response => {
                // storing first four posts
                const posts = response.data.slice(0, 4);
                // adding a 'author' property to all posts
                const updatedPosts = posts.map(post => {
                    return {
                        ...post, // spreading the data
                        author: 'Jii' // and hard coding new property
                    }
                })
                this.setState({ posts: updatedPosts }); // setState has to be inside this then()-method
                // if it was outside of it, it wouldn't be executed after then()-method
                // but alongside with it (execution doesn't wait for then() to finish)
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({ pathname: '/posts/' + id });
        // this.props.history.push('/posts/' + id); // alternative way of doing this
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    //<Link to={'/posts/' + post.id} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                    //</Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;