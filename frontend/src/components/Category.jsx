import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <div className='grid grid-cols-12'>
                <div className='col-span-12'>
                    <div className='px-5 mt-5'>
                        <div className='d-flex justify-content-center'>
                            <h3 className='text-3xl font-extrabold text-violet-800'>Category List</h3>
                        </div>
                        <Link to="/dashboard/add_category">
                            <button className="ui violet button">Add Category</button>
                        </Link>
                        <table className='table mt-4 text-violet-800'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category.map(category => (
                                    <tr key={category.id}>
                                        <td>{category.category}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category
