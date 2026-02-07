// import axios from 'axios';
// import { delay } from '../utils/helper';

// const baseUrl = import.meta.env.VITE_API_BASE_URL;
// const apiKey = import.meta.env.VITE_API_KEY;
// const headers =  {
//     'apikey': apiKey }


// export const login = async () => {
// await delay(2000); // Simulate network delay
// const res = await axios.get(`${baseUrl}/employees/summary`, {
//   headers: headers
//   });
// if(!res.data.error)
//         return res.data.data;
// else
//         throw new Error(res.data.message);
// };