import React, { useState, useEffect } from 'react';
import { useUserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import getAxios from '../AuthAxios';
import BookmarkRow from '../components/BookmarkRow';

const ViewUsersBookmarks = () => {

    const { user } = useUserContext();
    const [usersBookmarks, setUsersBookmarks] = useState();
    const[rerender, setRerender] = useState(false);
    useEffect(() => {
        const getBookmarks = async () => {
            const { data } = await getAxios().get('/api/Bookmarks/GetUsersBookmarks');
            setUsersBookmarks(data);
        }
        getBookmarks();
    }, [rerender]) 

    const forceRerender = () => {
        let rerenderSet = true;
        setRerender(rerenderSet);
    }



    return (
        <main role="main" className="pb-3">
            <div>
                <div className="row">
                    <div className="col-md-12">
                        {user && <h1>Welcome back {user.firstName} {user.lastName}  </h1>}

                        <Link to='/AddBookmark' className="btn btn-info"> Add Bookmark </Link>
                    </div>
                </div>
                <div className="row">

                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Url</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                           {usersBookmarks && usersBookmarks.map(b => <BookmarkRow bookmark={b} key={b.id} rerender={forceRerender}/>)}
                        </tbody>
                    </table>

                </div>
            </div>
        </main>
    )
}

export default ViewUsersBookmarks;