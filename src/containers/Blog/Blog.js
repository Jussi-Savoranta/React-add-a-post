import React, { Component } from 'react';
//import axios from 'axios';
import axios from '../../axios'; // you could name this as axiosInstance but for practical reasons it's axios

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
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
                this.setState({ error: true })
                // console.log(error);
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    render() {
        let posts = <p style={{ textAlign:'center' }}>Something went wrong</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />;
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;