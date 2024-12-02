import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const [category, setCategory] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8081/auth/add_category', { category })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/category')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center h-75'>
                <div className='p-3 rounded w-25 border'>
                    <h2 className='text-center text-2xl font-bold py-2'>Add Category</h2>
                    <form className="ui form mt-2" onSubmit={handleSubmit}>
                        <div className="field">
                            <label><strong>Category Name</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter New Category"
                                onChange={(e) => setCategory(e.target.value)} />
                        </div>
                        <button className="ui blue button w-100 blue" type="submit">Add Category</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCategory
