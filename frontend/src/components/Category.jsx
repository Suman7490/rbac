import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableHeader, TableHeaderCell, TableRow, TableCell } from 'semantic-ui-react'

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
            <div className='px-5 mt-5'>
                <div className='d-flex justify-content-center'>
                    <h3 className='text-3xl font-extrabold'>Category List</h3>
                </div>
                <Link to="/dashboard/add_category">
                    <button className="ui green button">Add Category</button>
                </Link>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {category.map(category => (
                            <TableRow>
                                <TableCell>{category.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default Category
