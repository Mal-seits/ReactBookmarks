import React, { useState } from 'react';
import getAxios from '../AuthAxios';
import { useHistory } from 'react-router-dom';

const AddBookmark = () => {

    const [formData, setFormData] = useState({ title: '', url: '' });
    let { title, url } = formData;
    const [disable, setDisable] = useState(false);
    const history = useHistory();

    const onTextChange = e => {
        let formDataCopy = { ...formData };
        formDataCopy[e.target.name] = e.target.value;
        setFormData(formDataCopy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        let disableButton = true;
        setDisable(disableButton);
        await getAxios().post('/api/bookmarks/addbookmark', formData);
        history.push('/ViewUsersBookmarks');

    }
    return (
        <div class="col-md-6 offset-md-3 card card-body bg-light">
            <h3>Add Bookmark</h3>
            <form onSubmit={onFormSubmit}>
                <input onChange={onTextChange} type="text" name="title" placeholder="Title" class="form-control" value={title} />
                <br />
                <input onChange={onTextChange} type="text" name="url" placeholder="Url" class="form-control" value={url} />
                <br />
                <button disabled={disable} class="btn btn-primary">Add</button>
            </form>
        </div>
    )

}
export default AddBookmark;