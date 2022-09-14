import './styles.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { config } from '../../App';
import { toast } from 'react-toastify';
import { BsTrash } from 'react-icons/bs'


const Home = ({ property , setProperty }) => {
    // const [property, setProperty] = useState([]);
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}/users/all`);
            console.log(response);
            setUsers(response.data.properties);
            toast.success('Properties fetched successfully');
        }
        catch (error) {
            toast.error('Properties fetch failed');
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        // setProperty((prevProperty) => prevProperty.filter((item) => item.id !== id))

        try {
            const response = await axios.delete(`${config.baseUrl}/user/delete/?id=${id}`)
            console.log(response);
            // window.location.reload();
            setUsers((prevUser) => prevUser.filter(item => item._id !== id))
            toast.success('Propeerty successfully deleted');
        }
        catch (err) {
            console.log(err);
            toast.error('Failed to delete property');
        }
    }

    useEffect(() => {
        console.log(config)
        getUsers()
    }, []);

    return (
        <div className="home">
            <h1>Uploaded Data</h1>
            {users.length > 0 ? (
                <div className='card-container'>
                    {users.map((item, index) => (
                        <div key={item._id || index} className='card'>
                                <div className='card-item'>
                                    <h3>{item.name}</h3>
                                    {/* <p>{item.id}</p> */}
                                    <p>{item.description}</p>
                                    <p>{item.size}</p> 
                                </div>
                                <button className='cart-btn' onClick={() => handleDelete(item._id)}>
                                    {/* <BsTrash size={24} color="orange" /> */}
                                    DELETE
                                </button>
                            {/* ))} */}
                        </div>
                    ))}
                </div>
            ) : (
                <h1>No data</h1>
            )}
        </div>
    );
}

export default Home;