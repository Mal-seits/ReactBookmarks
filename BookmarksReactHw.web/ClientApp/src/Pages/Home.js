import React, { useState, useEffect } from 'react';
import getAxios from '../AuthAxios';

const Home = () => {
    const [bookmarks, setBookmarks] = useState();
    useEffect(() => {
        const getBookmarks = async () => {
            const { data } = await getAxios().get('/api/bookmarks/gettopfivebookmarks');
            setBookmarks(data);
        }
        getBookmarks();
       
    }, [])
    return (
        <div>
            <h1>Welcome to the Bookmarks Manager!</h1>
            <h5>A project of the MalkySeitlerFoundation</h5>
            <h3>Check out the most popular links!</h3>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                     
                        <td>Url</td>
                        <td>Count</td>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks && bookmarks.map(b => <tr key={b.id}>
                        <td>
                            <a href={b.url} target="_blank">{b.url}</a></td>
                        <td>{b.count}</td>
                    </tr>)}
                </tbody>

            </table>
        </div>
    )
}
export default Home;