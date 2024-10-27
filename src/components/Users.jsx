import React, { useEffect, useState } from 'react'
import datas from '../datas/datas.js'

function Users() {
    const [alldata, setAllData] = useState(datas || [])
    console.log(alldata)
    useEffect(async () => {
        try {
            const fetchData = async () => {
                const getJSONData = localStorage.getItem("user")
                const newData = await JSON.parse(getJSONData)
                setAllData(
                    alldata.push({
                        id: datas.length + 1,
                        name: newData.username,
                        gmail: newData.usergmail,
                        contact: newData.usercontact
                    })
                )
            }
            await fetchData()
            // debugger
            console.log(alldata)
        } catch (error) {
            console.log("fetch Error =" + error)
        }
    }, [])

    return (
        <>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold text-center mb-6">User Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {alldata.map((user, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
                            <p className="text-gray-600">Email: {user.gmail}</p>
                            <p className="text-gray-600">Contact: {user.contact}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};


export default Users