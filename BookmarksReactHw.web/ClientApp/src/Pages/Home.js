import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [bookmarks, setBookmarks] = useState([]);
    
    useEffect(() => {
        const getBookmarks = async () => {
            const { data } = await axios.get('/api/bookmarks/gettopfivebookmarks');
            setBookmarks(data);
        }
        getBookmarks();
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 85, marginBottom: 35 }}>
                <div style={{ fontFamily: 'Arial', color: '#6495ED', fontWeight: 'bold', fontSize: 26 }}>Welcome to the Bookmarks Manager!</div>
            </div>
            <div>
                <table className="table table-hover table-bordered">
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


        </div>
    )
}
export default Home;