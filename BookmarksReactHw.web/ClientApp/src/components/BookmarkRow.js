import React, { useState, useEffect } from 'react';
import getAxios from '../AuthAxios';
import {useHistory} from 'react-router-dom';

const BookmarkRow = ({ bookmark, rerender }) => {

    let { id, title, url, userId} = bookmark;
    const [inEditMode, setInEditMode] = useState();
    const[editedTitle, setEditedTitle] = useState(title);
   
    const onEditClick = e => {
        let edit = true
        setInEditMode(edit);
    }

    const onTextChange = e => {
       let editedTitleCopy = e.target.value;
       setEditedTitle(editedTitleCopy);
    }
    const onCancelClick = () => {
        let editMode = false;
        setInEditMode(editMode);
        let editTitle = title;
        setEditedTitle(editTitle);
    }

    const onDeleteClick = async () => {
        await getAxios().post('/api/bookmarks/deletebookmark', bookmark);
        rerender();
    }

    const onUpdateClick = async () => {
       
        let bookmarkEdit = {
            title: editedTitle,
            url: url,
            id: id,
            userId: userId
        }
        await getAxios().post('/api/bookmarks/updatebookmark', bookmarkEdit);
        rerender();
        onCancelClick();
    }

    useEffect(() => {

    }, [inEditMode])
    return (


        <tr key={id}>

            <td>

                {!inEditMode ? title : <input type="text" className="form-control" placeholder="Title" value={editedTitle} onChange={onTextChange}></input>}
            </td>
            <td>
                <a href={url} target="_blank">{url}</a>
            </td>
            <td>{!inEditMode ? <button onClick={onEditClick} className="btn btn-success">Edit Title</button>
                : <> <button className="btn btn-warning" onClick={onUpdateClick}>Update</button>
                    <button className="btn btn-info" onClick={onCancelClick}>Cancel</button> </>}
                <button className="btn btn-danger" onClick={onDeleteClick}>Delete</button>
            </td>
        </tr>

    )
}
export default BookmarkRow;