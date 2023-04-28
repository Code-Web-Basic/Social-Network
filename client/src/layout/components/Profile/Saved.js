import * as React from 'react';
import * as bookmarksApi from '~/api/bookmarksApi/bookmarksApi'
// mui ui
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import * as postApi from '~/api/postApi/postApi'
function Saved() {
    const theme = useTheme();
    // const currentUser = useSelector((state) => state.auth.currentUser.data);
    const [bookMarks, getBookMarks] = useState([])
    const [listPost, setListPost] = useState([])

    const getBookMark = async () => {
        const res = await bookmarksApi.getBookMarks()
        getBookMarks(res)
    }
    useEffect(() => {
        getBookMark()
    }, [])

    const getPostById = async (id) => {
        const res = await postApi.getPostById(id)
        // console.log(res)
        setListPost([...listPost, res])
    }
    useEffect(() => {
        console.log(bookMarks)
        bookMarks.map((bookMark) => {
            // console.log(bookMark)
            getPostById('644ab09eaee1ff070d74d7d6')
        })
    }, [bookMarks])

    useEffect(() => {
        console.log(listPost)
    }, [listPost])
    return (<div>
        saved
    </div>);
}

export default Saved;